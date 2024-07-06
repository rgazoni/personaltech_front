import { LabeledInput } from '@/components/common/labeled-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { createUser } from '@/features/user/create-user';
import { useProgressContext } from '@/providers/signup-provider';
import { useEffect, useState } from 'react';
import { useSubmitionOutput } from './hooks/use-form-submition';
import { isValidCref } from '@/lib/helpers';
import { formatCref } from '@/lib/formatters';

export const NaturalLisense = () => {
  // @reducers
  const { dispatch, state } = useProgressContext();
  const request = useAppSelector((appState) => appState.user.request);

  // @states
  const [cref, setCref] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [terms, setTerms] = useState<boolean>(false);

  // @effects
  useEffect(() => {
    const formattedCref = formatCref(cref, 'natural');
    setCref(formattedCref);
    setIsValid(isValidCref(cref, 'natural'));
  }, [cref]);

  // @hooks
  const appDispatch = useAppDispatch();
  const { formTriggered, isResponseWithNoErrors, isLoading } =
    useSubmitionOutput(request.error, request.loading);

  if (isResponseWithNoErrors) {
    dispatch({ type: 'next' });
  }

  return (
    <form
      className="mt-7 flex flex-col gap-4"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const obj = {
          cref: formData.get('cref') as string,
          type: 'natural',
        };
        appDispatch(
          createUser({
            cref: obj.cref,
            type: obj.type,
            email: state.user.email,
            password: state.user.password,
          })
        );
        formTriggered(true);
      }}
    >
      <div className="flex items-end gap-5">
        <div className="grow">
          <LabeledInput
            id="CREF"
            label="CREF"
            type="text"
            name="cref"
            placeholder="XXXXXX-X/XX"
            maxLength={11}
            value={cref}
            onChange={(e) => setCref(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm font-light text-tertiary">
        <Input
          type="checkbox"
          name="terms"
          id="terms"
          className="w-fit"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
        />
        <p>Eu declaro que os dados são verídicos e pertencem a minha pessoa.</p>
      </div>

      <div className="mt-10 flex w-full justify-between">
        <Button
          variant={null}
          type="button"
          onClick={() => dispatch({ type: 'previous' })}
        >
          Voltar
        </Button>
        <Button className="rounded-lg" type="submit" disabled={!terms || !isValid}>
          {isLoading ? 'Carregando...' : 'Criar Conta'}
        </Button>
      </div>
    </form>
  );
};
