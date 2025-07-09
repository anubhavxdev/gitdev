// Utility for extracting mutation loading state from tRPC mutation hook
// tRPC mutation hooks use TanStack React Query under the hood
// The correct property for loading state is 'status' (not 'isLoading')
// https://trpc.io/docs/client/react/useMutation

type MutationState = {
  status: 'idle' | 'loading' | 'pending' | 'success' | 'error';
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  isLoading?: boolean;
};

export function getMutationLoading(mutation: MutationState): boolean {
  return (
    mutation.isPending || 
    mutation.status === 'loading' || 
    mutation.status === 'pending' ||
    mutation.isLoading === true
  );
}
