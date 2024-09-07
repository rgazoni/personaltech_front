import { LabeledInput } from '@/components/common/labeled-input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEditPersonalContext } from '@/providers/edit-personal-page-provider';
import { useId } from 'react';
import { expertisesOpts } from '../expertises-opts';
import { Badge } from '@/components/ui/badge';

type AboutYouProps = {
  data: {
    page_name: string;
    expertises: string[];
    profession: string;
    service_value: string;
    about_you: string;
    city: string;
    state: string;
  };
};

export const AboutYou = ({ data }: AboutYouProps) => {
  const { dispatch, state } = useEditPersonalContext();


  const handleExpertises = (expertises: string) => {
    if (state.expertises.includes(expertises)) {
      // Expertise is already selected, so remove it
      dispatch({
        type: 'update-expertises',
        payload: { expertises: state.expertises.filter((e) => e !== expertises) },
      });
    } else {
      // Expertise is not selected, so add it
      dispatch({
        type: 'update-expertises',
        payload: { expertises: [...state.expertises, expertises] },
      });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <LabeledInput
        label="Nome da Página *"
        name="page_name"
        id="page_name"
        defaultValue={data.page_name}
        onBlur={(e) =>
          dispatch({
            type: 'update-page_name',
            payload: { page_name: e.target.value },
          })
        }
      />
      <Label className={'text-sm font-light text-tertiary'}>
        Selecione suas especialidades *
      </Label>
      <div className="flex gap-2 pb-1 flex-wrap w-full">
        {expertisesOpts.map((expertise) => (
          <Badge
            key={expertise.id}
            className={`text-sm font-light text-secondary text-white hover:cursor-pointer text-nowrap
            ${state.expertises.includes(expertise.label) ? 'bg-primary shadow-lg' : 'bg-secondary'}
              `}
            onClick={() => handleExpertises(expertise.label)}
          >
            {expertise.label}
          </Badge>
        ))}
      </div>
      <LabeledInput
        label="Profissão para o seu perfil *"
        name="profession"
        id="profession"
        defaultValue={data.profession}
        onBlur={(e) =>
          dispatch({
            type: 'update-profession',
            payload: { profession: e.target.value },
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
          className='whitespace-pre-wrap'
          defaultValue={data.about_you}
          id={useId() + 'about_you'}
          rows={8}
          onBlur={(e) =>
            dispatch({
              type: 'update-about_you',
              payload: { about_you: e.target.value },
            })
          }
        />
      </div>
      <LabeledInput
        label="Qual o valor do seu serviço por aula? *"
        name="service_value"
        id="service_value"
        defaultValue={data.service_value}
        type="number"
        onBlur={(e) =>
          dispatch({
            type: 'update-service_value',
            payload: { service_value: e.target.value },
          })
        }
      />
      <div className='grid-cols-2 grid gap-2'>
        <LabeledInput
          label="Cidade"
          name="city"
          id="city"
          defaultValue={data.city}
          onBlur={(e) => {
            dispatch({
              type: 'update-city',
              payload: { city: e.target.value },
            })
          }}
        />
        <LabeledInput
          label="Estado"
          name="state"
          id="state"
          defaultValue={data.state}
          onBlur={(e) =>
            dispatch({
              type: 'update-state',
              payload: { state: e.target.value },
            })
          }
        />
      </div>
    </div>
  );
};
