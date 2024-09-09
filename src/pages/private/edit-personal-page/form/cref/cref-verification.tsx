import useAppStore from '@/store';
import { CrefModal } from './cref-modal';
import { useQuery } from '@tanstack/react-query';
import { CrefStatusResponse, fetchCrefStatus } from '@/api/cref';

export const CrefVerification = () => {
  const user = useAppStore((state) => state.user);
  const { data, isPending } = useQuery<CrefStatusResponse>({
    queryKey: ['cref', user.id],
    queryFn: () => fetchCrefStatus(user.cref),
    refetchInterval: (data) => {
      // Check if the status is 'pending', refetch every 5 seconds
      if (data.state.data?.status === 'pending') {
        return 5000; // 5 seconds
      }
      // Stop refetching if status is 'valid' or 'invalid'
      return false; // Disables refetch
    },
  });

  return (
    <CrefModal isLoading={isPending} verificationStage={data?.status as 'pending' | 'valid' | 'invalid'}>
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
