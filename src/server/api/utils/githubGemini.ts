import fetch from 'node-fetch';

// GitHub API Types
interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: GitHubUser;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
}

interface GitHubCommitFile {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
  raw_url: string;
  blob_url: string;
}

interface GitHubCommitStats {
  total: number;
  additions: number;
  deletions: number;
}

interface GitHubCommitAuthor {
  name: string;
  email: string;
  date: string;
}

interface GitHubCommitCommit {
  message: string;
  author: GitHubCommitAuthor;
  committer: GitHubCommitAuthor;
}

interface GitHubCommit {
  sha: string;
  commit: GitHubCommitCommit;
  author: GitHubUser | null;
  committer: GitHubUser | null;
  html_url: string;
  files?: GitHubCommitFile[];
  stats?: GitHubCommitStats;
}

interface GitHubContributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface GitHubReadMe {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

interface GitHubRepoInfo {
  name: string;
  ownerLogin: string;
  ownerId: number;
  html_url: string;
  description: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  openPrs: number | null;
  contributors: Array<{
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
  }>;
  readme: string | null;
}

// Parse a GitHub repo URL into { owner, repo }
export function parseGithubUrl(url: string): { owner: string; repo: string } | null {
  try {
    const match = url.match(/github.com\/([^/]+)\/([^/]+?)(?:\.git|\/|$)/);
    if (!match?.[1] || !match[2]) return null;
    return { 
      owner: match[1], 
      repo: match[2].replace(/\.git$/, '') 
    };
  } catch (error) {
    console.error('Failed to parse GitHub URL:', error);
    return null;
  }
}

// Fetch repository info from GitHub API
export async function getGithubRepoInfo({ 
  owner, 
  repo, 
  token 
}: { 
  owner: string; 
  repo: string; 
  token?: string 
}): Promise<GitHubRepoInfo> {
  try {
    // Fetch repo details
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: token ? { Authorization: `token ${token}` } : {},
    });
    
    if (!repoRes.ok) {
      throw new Error(`Failed to fetch repo info: ${repoRes.status} ${repoRes.statusText}`);
    }
    
    const repoData: GitHubRepo = await repoRes.json();

    // Fetch contributors (top 5)
    let contributors: GitHubContributor[] = [];
    try {
      const contribRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=5`, 
        { headers: token ? { Authorization: `token ${token}` } : {} }
      );
      if (contribRes.ok) {
        contributors = (await contribRes.json()) as GitHubContributor[];
      }
    } catch (error) {
      console.error('Failed to fetch contributors:', error);
    }

    // Fetch README
    let readme: string | null = null;
    try {
      const readmeRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/readme`,
        { headers: token ? { Authorization: `token ${token}` } : {} }
      );
      
      if (readmeRes.ok) {
        const readmeData: GitHubReadMe = await readmeRes.json();
        if (readmeData.content) {
          try {
            readme = Buffer.from(readmeData.content, 'base64').toString('utf-8');
          } catch (error) {
            console.error('Failed to decode README:', error);
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch README:', error);
    }

    // Fetch open PR count
    let openPrs: number | null = null;
    try {
      const prsRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/pulls?state=open&per_page=1`,
        { headers: token ? { Authorization: `token ${token}` } : {} }
      );
      
      if (prsRes.ok) {
        const link = prsRes.headers.get('link');
        if (link?.includes('rel="last"')) {
          const match = /&page=(\d+)>; rel="last"/.exec(link);
          openPrs = match?.[1] ? parseInt(match[1], 10) : 1;
        } else {
          const prs = (await prsRes.json()) as Array<unknown>;
          openPrs = prs.length;
        }
      }
    } catch (error) {
      console.error('Failed to fetch PR count:', error);
    }

    return {
      name: repoData.name,
      ownerLogin: repoData.owner.login,
      ownerId: repoData.owner.id,
      html_url: repoData.html_url,
      description: repoData.description,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      openIssues: repoData.open_issues_count,
      openPrs,
      contributors: contributors.map(contributor => ({
        login: contributor.login,
        avatar_url: contributor.avatar_url,
        html_url: contributor.html_url,
        contributions: contributor.contributions,
      })),
      readme,
    };
  } catch (error) {
    console.error('Error in getGithubRepoInfo:', error);
    throw error;
  }
}

// Fetch commit details (including files changed and diff)
export async function getGithubCommitDetails({
  owner,
  repo,
  sha,
  token,
}: {
  owner: string;
  repo: string;
  sha: string;
  token?: string;
}) {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${sha}`, {
      headers: token ? { Authorization: `token ${token}` } : {},
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch commit details: ${res.status} ${res.statusText}`);
    }

    const data: GitHubCommit = await res.json();
    
    return {
      sha: data.sha,
      files: data.files?.map(file => ({
        filename: file.filename,
        status: file.status,
        additions: file.additions,
        deletions: file.deletions,
        changes: file.changes,
        patch: file.patch,
        raw_url: file.raw_url,
        blob_url: file.blob_url,
      })) || [],
      stats: data.stats,
      author: data.commit?.author?.name,
      message: data.commit?.message,
      date: data.commit?.author?.date,
      url: data.html_url,
    };
  } catch (error) {
    console.error('Error in getGithubCommitDetails:', error);
    throw error;
  }
}

// Fetch commits from GitHub API
export async function getGithubCommits({
  owner,
  repo,
  token,
  perPage = 10,
}: {
  owner: string;
  repo: string;
  token?: string;
  perPage?: number;
}) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${perPage}`,
      {
        headers: token ? { Authorization: `token ${token}` } : {},
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch commits: ${res.status} ${res.statusText}`);
    }

    const commits = (await res.json()) as GitHubCommit[];
    
    return commits.map(commit => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author?.name || commit.author?.login || 'Unknown',
      date: commit.commit.author?.date,
      url: commit.html_url,
    }));
  } catch (error) {
    console.error('Error in getGithubCommits:', error);
    throw error;
  }
}

// Call Gemini API for explanation
export async function getGeminiExplanation({
  commitMessage,
  geminiApiKey,
}: {
  commitMessage: string;
  geminiApiKey: string;
}): Promise<string> {
  try {
    const res = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': geminiApiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Explain this Git commit message in simple terms:\n\n${commitMessage}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const errorBody = await res.text();
      console.error('[Gemini API] Failed to get explanation', {
        status: res.status,
        statusText: res.statusText,
        body: errorBody,
      });
      throw new Error('Failed to get explanation from Gemini API');
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No explanation available.';
  } catch (error) {
    console.error('Error in getGeminiExplanation:', error);
    throw error;
  }
}
