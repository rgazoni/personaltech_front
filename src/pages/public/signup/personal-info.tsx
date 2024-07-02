import { LabeledInput } from '@/components/common/labeled-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProgressContext } from '@/providers/signup-provider';
import { Search } from 'lucide-react';

export const PersonalInfo = () => {
  const { dispatch } = useProgressContext();

  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary">Licença</h1>
      <form
        className="mt-7 flex flex-col gap-4"
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const obj = {
            cref: formData.get('cref') as string,
          };
          console.log(obj);
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
            />
          </div>
          <div
            className="rounded border p-2 hover:bg-tertiary-foreground"
            onClick={() => console.log('search')}
          >
            <Search size={22} className="text-muted-foreground" />
          </div>
        </div>

        <LabeledInput
          id="name"
          name="name"
          label="Nome Completo"
          labelClassName="text-muted"
          type="text"
          value={'João da Silva'}
          disabled
        />

        <div className="mt-4 flex text-sm font-light text-tertiary gap-4">
          <Input type="checkbox" name="terms" id="terms" className='w-fit' />
          <p>Eu declaro que os dados são verídicos e pertencem a minha pessoa.</p>
        </div>
        <div className="flex w-full flex-col">
          <Button
            className="mx-auto mt-10 w-4/6 rounded-full py-6"
            type="submit"
            onClick={() => dispatch({ type: 'next' })}
          >
            Avançar
          </Button>
        </div>
      </form>
    </div>
  );
};
