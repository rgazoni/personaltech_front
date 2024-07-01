import { LabeledInput } from '@/components/common/labeled-input';
import { Button } from '@/components/ui/button';

export const SigninInfo = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary">Cadastro</h1>
      <form className="mt-7 flex flex-col gap-4">
        <LabeledInput label="E-mail" type="email" />
        <LabeledInput label="Senha" type="password" />
        <LabeledInput label="Confirmar senha" type="password" />
        <div className="mt-4 flex flex-col text-sm font-light text-tertiary">
          <p>Ambas as senhas devem ser iguais</p>
          <p>Senha deve conter no mínimo 8 caracteres</p>
        </div>
        <div className="flex w-full flex-col">
          <Button className="mx-auto mt-10 w-4/6 rounded-full py-6">
            Criar conta
          </Button>
        </div>
      </form>
    </div>
  );
};
