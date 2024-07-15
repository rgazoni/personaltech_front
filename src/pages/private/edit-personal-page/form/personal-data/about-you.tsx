import { LabeledInput } from '@/components/common/labeled-input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { pageSlice } from '@/features/page';
import { useAppDispatch, useAppSelector } from '@/features/store';
import { useId } from 'react';

export const AboutYou = () => {
  const { page } = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-5">
      <LabeledInput
        label="Nome da Página *"
        name="page_name"
        id="page_name"
        defaultValue={page.page_name}
        onBlur={(e) =>
          dispatch(pageSlice.actions.updatePageName(e.target.value))
        }
      />
      <LabeledInput
        label="Profissão para o seu perfil *"
        name="profession"
        id="profession"
        defaultValue={page.profession}
        onBlur={(e) =>
          dispatch(pageSlice.actions.updateProfession(e.target.value))
        }
      />
      <LabeledInput
        label="Qual o valor do seu serviço? *"
        name="service_value"
        id="service_value"
        defaultValue={page.service_value}
        onBlur={(e) =>
          dispatch(pageSlice.actions.updateServiceValue(e.target.value))
        }
      />
      <div className="flex flex-col gap-2">
        <Label
          className="text-sm font-light text-tertiary"
          htmlFor={useId() + 'about_you'}
        >
          Escreva um pouco sobre você *
        </Label>
        <Textarea
          name="about_you"
          defaultValue={page.about_you}
          id={useId() + 'about_you'}
          onBlur={(e) =>
            dispatch(pageSlice.actions.updateAboutYou(e.target.value))
          }
        />
      </div>
    </div>
  );
};
