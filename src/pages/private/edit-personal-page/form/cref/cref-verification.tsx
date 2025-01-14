import useAppStore from '@/store';
import { CrefModal } from './cref-modal';
import { useQuery } from '@tanstack/react-query';
import { CrefStatusResponse, fetchCrefStatus } from '@/api/cref';

export const CrefVerification = () => {
  const user = useAppStore((state) => state.user);
  const updateUserField = useAppStore((state) => state.updateUserField);
  const { data, isPending, refetch } = useQuery<CrefStatusResponse>({
    queryKey: ['cref', user.id],
    queryFn: () => fetchCrefStatus({ id: user.id }),
    refetchInterval: (data) => {
      // Check if the status is 'pending', refetch every 5 seconds
      if (data.state.data?.status === 'pending') {
        return 5000; // 5 seconds
      }

      // Stop refetching if status is 'valid' or 'invalid'
      return false; // Disables refetch
    },
  });

  const handleRefetch = () => {
    setTimeout(() => {
      refetch();
    }, 1000);
    updateUserField('is_cref_verified', data?.status as 'valid' | 'invalid' | 'already_exists');
  }

  return (
    <CrefModal isLoading={isPending} verificationStage={data?.status as 'pending' | 'valid' | 'invalid'} handleRefetch={handleRefetch}>
      <div className="flex flex-col gap-1 p-2">
        <h2 className="text-muted">CREF</h2>
        <p>{user.cref}</p>
      </div>
      <div className="flex flex-col gap-1 p-2">
        <h2 className="text-muted">{data?.name ? 'Nome completo' : 'Email'}</h2>
        <p>{data?.name ?? user.email}</p>
      </div>
    </CrefModal>
  );
};
