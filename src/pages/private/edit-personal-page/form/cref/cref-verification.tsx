import { CrefModal } from "./cref-modal";

export const CrefVerification = () => {
  return (
    <CrefModal isVerified>
      <div className="p-2 flex flex-col gap-1">
        <h2 className="text-muted">CREF</h2>
        <p>012089-G/SP</p>
      </div>
      <div className="p-2 flex flex-col gap-1">
        <h2 className="text-muted">Nome completo</h2>
        <p>Felipe Matias Pelegrini dos Santos</p>
      </div>
    </CrefModal>
  );
}
