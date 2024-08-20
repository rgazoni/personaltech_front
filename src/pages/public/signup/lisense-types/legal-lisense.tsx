import { LabeledInput } from '@/components/common/labeled-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProgressContext } from '@/providers/signup-provider';
import { useEffect, useState } from 'react';
import { formatCref } from '@/lib/formatters';
import { isValidCref } from '@/lib/helpers';
import { useToast } from '@/hooks/use-toast.hook';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '@/api/user';
import useAppStore from '@/store';

export const LegalLisense = () => {
  const updateUser = useAppStore((state) => state.updateUser);

  // @reducers
  const { dispatch, state } = useProgressContext();

  // @states
  const [cref, setCref] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);

  // @effects
  useEffect(() => {
    const formattedCref = formatCref(cref, 'juridical');
    setCref(formattedCref);
    setIsValid(isValidCref(cref, 'juridical'));
  }, [cref]);

  // @hooks
  const { notify } = useToast();

  const mutation = useMutation({
    mutationKey: ['createUser/natural'],
    mutationFn: createUser,
    onSuccess: (data) => {
      notify('success', '🏋️ Usuário criado com sucesso!');
      updateUser(data);
      dispatch({ type: 'next' });
      updateUser(data);
    },
    onError: () => {
      notify('error', 'Erro ao criar usuário');
    }
  });

  return (
    <form
      className="mt-7 flex w-fit flex-col gap-4"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const obj = {
          cref: formData.get('cref') as string,
          type: 'juridical',
        };
        mutation.mutate({
          cref: obj.cref,
          type: obj.type,
          email: state.user.email,
          password: state.user.password,
        });
      }}
    >
      <div className="flex items-end gap-5">
        <div className="grow">
          <LabeledInput
            id="CREF"
            label="CREF"
            type="text"
            name="cref"
            placeholder="XXXXXX-XX/XX"
            value={cref}
            maxLength={12}
            onChange={(e) => setCref(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex gap-4 text-sm font-light text-tertiary">
        <Input
          type="checkbox"
          name="terms"
          id="terms"
          className="w-fit"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
        />
        <p className="text-wrap">
          Eu declaro que os dados pertencem a empresa fantasia da página a ser
          criada.
        </p>
      </div>
      <div className="mt-10 flex w-full justify-between">
        <Button
          variant={null}
          type="button"
          onClick={() => dispatch({ type: 'previous' })}
        >
          Voltar
        </Button>
        <Button
          className="rounded-lg"
          type="submit"
          disabled={!terms || !isValid}
        >
          {mutation.isPending ? 'Carregando...' : 'Criar Conta'}
        </Button>
      </div>
    </form>
  );
};
