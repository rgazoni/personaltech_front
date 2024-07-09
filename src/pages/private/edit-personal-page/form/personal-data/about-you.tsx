import { LabeledInput } from '@/components/common/labeled-input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEditPersonalPageFormContext } from '@/providers/edit-personal-page-form';
import { useId } from 'react';

export const AboutYou = () => {
  const { dispatch, state } = useEditPersonalPageFormContext();
  return (
    <div className="flex flex-col gap-5">
      <LabeledInput
        label="Nome da Página *"
        name="page_name"
        id="page_name"
        defaultValue={state.page_name}
        onChange={(e) =>
          dispatch({
            type: 'update-page_name',
            payload: { page_name: e.target.value },
          })
        }
      />
      <LabeledInput
        label="Profissão para o seu perfil *"
        name="profession"
        id="profession"
        onChange={(e) =>
          dispatch({
            type: 'update-profession',
            payload: { profession: e.target.value },
          })
        }
      />
      <LabeledInput
        label="Qual o valor do seu serviço? *"
        name="service_value"
        id="service_value"
        onChange={(e) =>
          dispatch({
            type: 'update-service_value',
            payload: { service_value: e.target.value },
          })
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
          id={useId() + 'about_you'}
          onBlur={(e) =>
            dispatch({
              type: 'update-about_you',
              payload: { about_you: e.target.value },
            })
          }
        />
      </div>
    </div>
  );
};
