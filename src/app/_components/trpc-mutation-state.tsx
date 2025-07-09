// Utility for extracting mutation loading state from tRPC mutation hook
// tRPC mutation hooks use TanStack React Query under the hood
// The correct property for loading state is 'status' (not 'isLoading')
// https://trpc.io/docs/client/react/useMutation

import type { UseTRPCMutationResult } from '@trpc/react-query';

export function getMutationLoading(mutation: { status: string }) {
  return mutation.status === 'loading';
}
