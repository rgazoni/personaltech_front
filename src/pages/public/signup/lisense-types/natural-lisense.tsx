import { LabeledInput } from "@/components/common/labeled-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProgressContext } from "@/providers/signup-provider";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";

export const NaturalLisense = () => {
  const { dispatch } = useProgressContext();

  const [cref, setCref] = useState<string>('');

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
            onChange={(e) => setCref(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex gap-4 text-sm font-light text-tertiary items-center">
        <Input type="checkbox" name="terms" id="terms" className="w-fit" />
        <p>
          Eu declaro que os dados são verídicos e pertencem a minha pessoa.
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
          onClick={() => dispatch({ type: 'next' })}
        >
          Criar Conta
        </Button>
      </div>
    </form>


  )
}
