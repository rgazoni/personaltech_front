import { fetchCrefRenew } from '@/api/cref';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast.hook';
import useAppStore from '@/store';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useMutation } from '@tanstack/react-query';
import { AlertTriangle, CircleCheck, CircleDashed, Lightbulb } from 'lucide-react';
import { PropsWithChildren, useState } from 'react';

export const CrefModal = ({
  children,
  verificationStage,
  isLoading = false,
  handleRefetch,
}: PropsWithChildren<{
  verificationStage: 'valid' | 'invalid' | 'pending' | null,
  isLoading: boolean
  handleRefetch: () => void
}>) => {

  let cref_text: string;

  const user = useAppStore((state) => state.user);
  const [showDialog, setShowDialog] = useState(false);
  const { notify } = useToast();

  if (verificationStage === 'valid') {
    cref_text = 'Seu CREF foi verificado com sucesso!';
  } else if (verificationStage === 'invalid') {
    cref_text = 'Seu CREF não pôde ser verificado, corrija-o!';
  } else {
    cref_text = 'Aguardando verificação do seu CREF, pode demorar alguns minutos...';
  }

  const mutateRenewCref = useMutation({
    mutationKey: ['renewCref'],
    mutationFn: fetchCrefRenew,
    onSuccess: (data) => {
      console.log(data);
      notify('info', 'Seu CREF será verificado em breve!');
      handleRefetch();
    }
  });

  const handleChangeCref = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const obj = {
      type: formData.get('type') as string,
      cref: formData.get('cref') as string,
      personal_id: user.id,
    };

    if (!obj.cref || !obj.type) {
      notify('error', 'Preencha todos os campos');
    }

    const cref = obj.cref.replace('-', '').
      replace('/', '').
      toUpperCase().trim();

    obj.cref = cref;

    mutateRenewCref.mutate(obj);

    setShowDialog(false);
  };

  return isLoading ? (
    <div className="w-full">
      <section
        className={`flex w-full justify-between rounded border-2 p-4 shadow-sm`}
      >
        Carregando...
      </section>
    </div>
  ) : (
    <div className="w-full">
      {verificationStage === 'invalid' ? (
        <h3 className="pb-4 text-base font-light text-muted">{cref_text}</h3>
      ) :
        <h3 className="pb-4 text-base font-light text-muted">{cref_text}</h3>
      }
      <section
        className={`flex w-full flex-grow
          ${verificationStage === 'valid'
            ? 'border-silver-tree-400'
            : verificationStage === 'invalid'
              ? 'border-destructive'
              : 'border-amber-400'
          } justify-between rounded border-2 p-4 shadow-sm`}
      >
        <div className='flex-none h-full'>{children}</div>
        <div className='w-full h-full grow flex'>
          <div className="flex flex-col gap-1 p-2 h-full grow justify-between items-end">
            {verificationStage === 'valid' && <CircleCheck size={20} className="text-primary" />}
            {verificationStage === 'pending' && <CircleDashed size={20} className="animate-spin text-amber-400" />}
            {verificationStage === 'invalid' && (
              <div className='flex flex-row-reverse justify-center items-center h-full -mt-3'>
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <AlertTriangle size={20} className="text-destructive cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent align='start' className='w-72 flex gap-1'>
                      <div className='pt-0.5'>
                        <Lightbulb size={12} className='text-muted w-fit' />
                      </div>
                      <p className='text-xs text-muted text-wrap'>
                        Seu CREF não foi econtrado na base de dados da CONFEF, logo não conseguimos verificar. Por favor, insira um CREF válido ou entre em contato.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Change CREF */}
                <Dialog open={showDialog} onOpenChange={setShowDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant='link'
                      size='sm'
                      className='text-destructive py-0'
                    >
                      Alterar Cref
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]" >
                    <DialogHeader>
                      <DialogTitle>Cref</DialogTitle>
                      <DialogDescription>
                        Insira o número do seu CREF para verificação. Insira dígitos e letras sem espaços ou caracteres especiais
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleChangeCref}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label id='cref' className="text-right">
                            Pessoa
                          </Label>
                          <RadioGroup defaultValue="fisica" className='flex gap-4' name='type'>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="fisica" id="r1" />
                              <Label>Física</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="juridica" id="r2" />
                              <Label>Jurídica</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label id='cref' className="text-right">
                            CREF
                          </Label>
                          <Input
                            id="cref"
                            className="col-span-3"
                            name="cref"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Atualizar</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
