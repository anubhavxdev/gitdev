import { publicProcedure, createTRPCRouter } from '../trpc';
import { z } from 'zod';
import { execSync } from 'child_process';

export const versionControlRouter = createTRPCRouter({
  listBranches: publicProcedure.query(() => {
    try {
      const output = execSync('git branch', { encoding: 'utf-8' });
      return output.split('\n').filter(Boolean).map(line => line.replace('* ', ''));
    } catch (e) {
      return [];
    }
  }),
  listCommits: publicProcedure.input(z.object({ limit: z.number().default(10) })).query(({ input }) => {
    try {
      const output = execSync(`git log --oneline -n ${input.limit}`, { encoding: 'utf-8' });
      return output.split('\n').filter(Boolean).map(line => {
        const [hash, ...msg] = line.split(' ');
        return { hash, message: msg.join(' ') };
      });
    } catch (e) {
      return [];
    }
  }),
  createBranch: publicProcedure.input(z.object({ branchName: z.string().min(1) })).mutation(({ input }) => {
    try {
      execSync(`git branch ${input.branchName}`);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }),
  switchBranch: publicProcedure.input(z.object({ branchName: z.string().min(1) })).mutation(({ input }) => {
    try {
      execSync(`git checkout ${input.branchName}`);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }),
  deleteBranch: publicProcedure.input(z.object({ branchName: z.string().min(1) })).mutation(({ input }) => {
    try {
      execSync(`git branch -d ${input.branchName}`);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }),
});
