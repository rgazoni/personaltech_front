import { LabeledInput } from '@/components/common/labeled-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProgressContext } from '@/providers/signup-provider';
import { BadgeCheck } from 'lucide-react';

export const PageInfo = () => {
  const { dispatch } = useProgressContext();
  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary">
        Nome da sua página 🤸
      </h1>
      <form
        className="mt-7 flex flex-col gap-6"
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const obj = {
            cref: formData.get('cref') as string,
          };
          console.log(obj);
        }}
      >
        <div className="mt-5">
          <LabeledInput
            id="page-name"
            label="Qual será o nome da sua página?"
            type="text"
            name="page-name"
          />
        </div>

        <div className="mt-1 flex flex-col gap-2">
          <Label className="font-light text-tertiary">
            Qual será a sua URL?
          </Label>
          <div className="flex items-center gap-3">
            <Label className="italic text-secondary">personaltech.com/p/</Label>
            <Input type="text" name="page-url" id="page-url" />
            <BadgeCheck size={40} className="text-muted" />
          </div>
        </div>
        <div className="flex w-full flex-col">
          <Button
            className="mx-auto mt-10 w-4/6 rounded-full py-6"
            type="submit"
          >
            Criar página
          </Button>
        </div>
      </form>
    </div>
  );
};
