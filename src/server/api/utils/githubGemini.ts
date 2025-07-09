import fetch from 'node-fetch';

// Parse a GitHub repo URL into { owner, repo }
export function parseGithubUrl(url: string): { owner: string; repo: string } | null {
  try {
    const match = url.match(/github.com\/([^/]+)\/([^/]+?)(?:\.git|\/|$)/);
    if (!match || !match[1] || !match[2]) return null;
    return { 
      owner: match[1], 
      repo: match[2].replace(/\.git$/, '') 
    };
  } catch {
    return null;
  }
}

// Fetch repository info from GitHub API
export async function getGithubRepoInfo({ owner, repo, token }: { owner: string; repo: string; token?: string }) {
  const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: token ? { Authorization: `token ${token}` } : {},
  });
  if (!repoRes.ok) throw new Error('Failed to fetch repo info from GitHub');
  const data = await repoRes.json();

  // Fetch contributors (top 5)
  const contribRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=5`, {
    headers: token ? { Authorization: `token ${token}` } : {},
  });
  const contributors = contribRes.ok ? await contribRes.json() : [];

  // Fetch README
  const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: token ? { Authorization: `token ${token}` } : {},
  });
  let readme = null;
  if (readmeRes.ok) {
    const readmeData = await readmeRes.json();
    if (readmeData.content) {
      try {
        readme = Buffer.from(readmeData.content, 'base64').toString('utf-8');
      } catch {
        readme = null;
      }
    }
  }

  // Fetch open PR count
  let openPrs = null;
  try {
    const prsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls?state=open&per_page=1`, {
      headers: token ? { Authorization: `token ${token}` } : {},
    });
    if (prsRes.ok) {
      const link = prsRes.headers.get('link');
      if (link && link.includes('rel="last"')) {
        const match = link.match(/&page=(\d+)>; rel="last"/);
        openPrs = match ? parseInt(match[1], 10) : 1;
      } else {
        const arr = await prsRes.json();
        openPrs = arr.length;
      }
    }
  } catch { openPrs = null; }

  return {
    name: data.name,
    ownerLogin: data.owner?.login,
    ownerId: data.owner?.id,
    html_url: data.html_url,
    description: data.description,
    stars: data.stargazers_count,
    forks: data.forks_count,
    openIssues: data.open_issues_count,
    openPrs,
    contributors: contributors.map((c: any) => ({
      login: c.login,
      avatar_url: c.avatar_url,
      html_url: c.html_url,
      contributions: c.contributions,
    })),
    readme,
  };

}

// Fetch commit details (including files changed and diff)
export async function getGithubCommitDetails({ owner, repo, sha, token }: { owner: string; repo: string; sha: string; token?: string }) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${sha}`, {
    headers: token ? { Authorization: `token ${token}` } : {},
  });
  if (!res.ok) throw new Error('Failed to fetch commit details from GitHub');
  const data = await res.json();
  return {
    sha: data.sha,
    files: data.files?.map((f: any) => ({
      filename: f.filename,
      status: f.status,
      additions: f.additions,
      deletions: f.deletions,
      changes: f.changes,
      patch: f.patch,
      raw_url: f.raw_url,
      blob_url: f.blob_url,
    })) || [],
    stats: data.stats,
    author: data.commit?.author?.name,
    message: data.commit?.message,
    date: data.commit?.author?.date,
    url: data.html_url,
  };
}

// Fetch commits from GitHub API
export async function getGithubCommits({ owner, repo, token }: { owner: string; repo: string; token?: string }) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits`, {
    headers: token ? { Authorization: `token ${token}` } : {},
  });
  if (!res.ok) throw new Error('Failed to fetch commits from GitHub');
  const commits = await res.json();
  return commits.map((commit: any) => ({
    sha: commit.sha,
    message: commit.commit.message,
    author: commit.commit.author?.name,
    date: commit.commit.author?.date,
    url: commit.html_url,
  }));
}

// Call Gemini API for explanation
export async function getGeminiExplanation({ commitMessage, geminiApiKey }: { commitMessage: string; geminiApiKey: string }) {
  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': geminiApiKey,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Explain this Git commit message: ${commitMessage}` }] }],
    }),
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error('[Gemini API] Failed to get explanation', {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });
    throw new Error('Failed to get explanation from Gemini');
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No explanation generated.';
}
