import useAppStore from '@/store';
import { CrefModal } from './cref-modal';
import { useQuery } from '@tanstack/react-query';
import { fetchCrefStatus } from '@/api/cref';

export const CrefVerification = () => {
  const user = useAppStore((state) => state.user);
  const { data, isLoading } = useQuery({
    queryKey: ['cref', user.id],
    queryFn: () => fetchCrefStatus(user.cref),
  });

  return (
    <CrefModal isLoading={isLoading} isVerified={
      data?.status === 'valid'
    }>
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
