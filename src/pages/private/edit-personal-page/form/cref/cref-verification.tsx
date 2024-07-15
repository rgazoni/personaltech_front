import { useAppSelector } from '@/features/store';
import { CrefModal } from './cref-modal';

export const CrefVerification = () => {
  const { user } = useAppSelector(state => state.user);
  return (
    <CrefModal isVerified>
      <div className="flex flex-col gap-1 p-2">
        <h2 className="text-muted">CREF</h2>
        <p>{user.cref}</p>
      </div>
      <div className="flex flex-col gap-1 p-2">
        <h2 className="text-muted">Nome completo</h2>
        <p>Felipe Matias Pelegrini dos Santos</p>
      </div>
    </CrefModal>
  );
};
