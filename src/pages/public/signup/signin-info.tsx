import { LabeledInput } from '@/components/common/labeled-input';
import { Button } from '@/components/ui/button';
import { isValidEmail } from '@/lib/helpers';
import { useProgressContext } from '@/providers/signup-provider';
import { initialState, passwordReducer } from '@/reducers/signup-validation';
import { useReducer, useState } from 'react';

export const SigninInfo = () => {
  const [email, setEmail] = useState<boolean>(true);
  // @reducers/password-validation-signup
  const [{ len, equals }, dispatch] = useReducer(passwordReducer, initialState);
  // @context
  const { dispatch: progressDispatch, state } = useProgressContext();

  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary">Cadastro</h1>
      <form
        className="mt-7 flex flex-col gap-4"
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const obj = {
            email: formData.get('email') as string,
            birthdate: formData.get('birthdate') as string,
            password: formData.get('password') as string,
          };
          if (!isValidEmail(obj.email)) {
            setEmail(false);
            return;
          }

          progressDispatch({ type: 'update-user', payload: { user: obj } });
          progressDispatch({ type: 'next' });
        }}
      >
        <div>
          <LabeledInput
            id="email"
            label="E-mail"
            type="text"
            name="email"
            defaultValue={state.user.email}
          />
          {!email && (
            <p className="pt-0.5 text-xs font-light text-destructive">
              Seu e-mail deve ser válido
            </p>
          )}
        </div>
        <LabeledInput
          id="birthdate"
          label="Data de Nascimento`"
          type="date"
          name="birthdate"
        />
        <LabeledInput
          id="password"
          name="password"
          label="Senha"
          type="password"
          onChange={(e) =>
            dispatch({ type: 'password-length', payload: e.target.value })
          }
        />
        <LabeledInput
          id="confirm-password"
          name="confirm-password"
          label="Confirmar senha"
          type="password"
          onChange={(e) =>
            dispatch({ type: 'password-equals', payload: e.target.value })
          }
        />

        <div className="mt-4 flex flex-col text-sm font-light text-tertiary">
          <div className="flex gap-2">
            <p>Senha deve conter no mínimo 8 caracteres</p>
            {len && <span>✅</span>}
          </div>
          <div className="flex gap-2">
            <p>Ambas as senhas devem ser iguais</p>
            {equals && <span>✅</span>}
          </div>
        </div>
        <div className="flex w-full flex-col">
          <Button
            className="mx-auto mt-10 w-4/6 rounded-full py-6"
            type="submit"
            disabled={!len || !equals}
          >
            Avançar
          </Button>
        </div>
      </form>
    </div>
  );
};
