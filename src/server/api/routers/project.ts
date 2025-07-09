import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { parseGithubUrl, getGithubCommits, getGeminiExplanation, getGithubRepoInfo, getGithubCommitDetails } from "../utils/githubGemini";

export const projectRouter = createTRPCRouter({
  summarizeRepo: protectedProcedure
    .input(
      z.object({
        githubUrl: z.string(),
        githubToken: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { githubUrl, githubToken } = input;
      const geminiApiKey = process.env.GEMINI_API_KEY;
      if (!geminiApiKey) throw new Error('Gemini API key not set');
      const parsed = parseGithubUrl(githubUrl);
      if (!parsed) throw new Error('Invalid GitHub URL');
      // Fetch last 3 commits
      const commits = await getGithubCommits({
        owner: parsed.owner,
        repo: parsed.repo,
        token: githubToken,
      });
      const latestCommits = commits.slice(0, 3);
      // Compose summary prompt
      const repoInfo = `Repository: ${parsed.owner}/${parsed.repo}\n` +
        latestCommits.map((c: { message: string }, i: number) => `Commit #${i+1}: ${c.message}`).join('\n');
      // Ask Gemini for summary
      const summary = await getGeminiExplanation({
        commitMessage: `Summarize this repository and its latest commits:\n${repoInfo}`,
        geminiApiKey,
      });
      return { summary };
    }),
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        githubUrl: z.string(),
        githubToken: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { githubUrl, githubToken } = input;
      const geminiApiKey = process.env.GEMINI_API_KEY;
      if (!geminiApiKey) throw new Error('Gemini API key not set');

      const parsed = parseGithubUrl(githubUrl);
      if (!parsed) throw new Error('Invalid GitHub URL');

      // Fetch commits
      const commits = await getGithubCommits({
        owner: parsed.owner,
        repo: parsed.repo,
        token: githubToken,
      });

      // Fetch repo info
      const repoInfo = await getGithubRepoInfo({
        owner: parsed.owner,
        repo: parsed.repo,
        token: githubToken,
      });
      // Return repo info and commits
      return { repoInfo, commits };

    }),

  getCommitDetails: protectedProcedure
    .input(
      z.object({
        githubUrl: z.string(),
        sha: z.string(),
        githubToken: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { githubUrl, sha, githubToken } = input;
      const parsed = parseGithubUrl(githubUrl);
      if (!parsed) throw new Error('Invalid GitHub URL');
      const details = await getGithubCommitDetails({
        owner: parsed.owner,
        repo: parsed.repo,
        sha,
        token: githubToken,
      });
      return details;
    }),

  explainCommit: protectedProcedure
    .input(
      z.object({
        githubUrl: z.string(),
        sha: z.string(),
        githubToken: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { githubUrl, sha, githubToken } = input;
      const geminiApiKey = process.env.GEMINI_API_KEY;
      if (!geminiApiKey) throw new Error('Gemini API key not set');
      const parsed = parseGithubUrl(githubUrl);
      if (!parsed) throw new Error('Invalid GitHub URL');
      const details = await getGithubCommitDetails({
        owner: parsed.owner,
        repo: parsed.repo,
        sha,
        token: githubToken,
      });
      const prompt = `Explain this commit in simple terms:\nCommit message: ${details.message}\nFiles changed: ${details.files.map((f: { filename: string; status: string }) => f.filename + ' (' + f.status + ')').join(', ')}`;
      const explanation = await getGeminiExplanation({
        commitMessage: prompt,
        geminiApiKey,
      });
      return { explanation };
    }),
})
