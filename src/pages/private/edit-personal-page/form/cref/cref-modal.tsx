import { AlertTriangle, CircleCheck } from 'lucide-react';
import { PropsWithChildren } from 'react';

export const CrefModal = ({
  children,
  isVerified = null,
}: PropsWithChildren<{ isVerified?: boolean | null }>) => {
  let cref_text: string;
  if (isVerified) {
    cref_text = 'Seu CREF foi verificado com sucesso!';
  } else if (isVerified === false) {
    cref_text = 'Seu CREF não pôde ser verificado, corrija-o!';
  } else {
    cref_text = 'Aguardando verificação do seu CREF...';
  }
  return (
    <div className="w-full">
      <h3 className="pb-4 text-muted font-light text-base">
        {cref_text}
      </h3>
      <section
        className={`flex w-full ${isVerified
          ? 'border-silver-tree-400'
          : isVerified === null
            ? 'border-border'
            : 'border-amber-400'
          } justify-between rounded border-2 p-4 shadow-sm`}
      >
        <div>
          {children}
        </div>
        <div>
          <div className="flex flex-col gap-1 p-2">
            {isVerified && <CircleCheck size={20} className="text-primary" />}
            {isVerified === false && (
              <AlertTriangle size={20} className="text-amber-400" />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
