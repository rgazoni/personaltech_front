import { LabeledInput } from '@/components/common/labeled-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEditPersonalContext } from '@/providers/edit-personal-page-provider';

type SocialMediaProps = {
  data: {
    whatsapp: string;
    instagram: string;
    tiktok: string;
    presentation_video: string;
  };
};

export const SocialMedia = ({ data }: SocialMediaProps) => {
  const { dispatch } = useEditPersonalContext();

  return (
    <div className="mt-5 flex flex-col gap-5">
      <div className="flex flex-col pb-2">
        <div className='pb-2 flex flex-col'>
          <Label
            className={`text-sm font-light text-tertiary`}
            htmlFor={'whatsapp'}
            id={'whatsapp-label'}
          >
            Whatsapp
          </Label>
          <span className='text-[10px] font-light'>Caso você queira que os alunos entrem em contato pessoal com você, só alunos logados poderão ter acesso ao seu contato</span>
        </div>
        <Input id='wpp-input' name='whatsapp'
          defaultValue={data.whatsapp}
          placeholder='(00) 00000-0000'
          type='tel'
          onBlur={(e) =>
            dispatch({ type: 'update-whatsapp', payload: { whatsapp: e.target.value } })
          }
        />
      </div>

      <div className="flex flex-col pb-2">
        <div className='pb-2 flex items-center'>
          <Label
            className={`text-sm font-light text-tertiary`}
            htmlFor={'instagram'}
            id={'instagram-label'}
          >
            Instagram
          </Label>
          <span className='text-xs font-light pl-2'> - deixe seu @ abaixo</span>
        </div>
        <Input id='instagram-input' name='instagram'
          defaultValue={data.instagram}
          placeholder='@personaltech'
          onBlur={(e) =>
            dispatch({ type: 'update-instagram', payload: { instagram: e.target.value } })
          }
        />
      </div>
      <div className="flex flex-col pb-2">
        <div className='pb-2 flex items-center'>
          <Label
            className={`text-sm font-light text-tertiary`}
            htmlFor={'tiktok'}
            id={'tiktok-label'}
          >
            TikTok
          </Label>
          <span className='text-xs font-light pl-2'> - deixe seu @ abaixo</span>
        </div>
        <Input id='tiktok-input' name='tiktok'
          placeholder='@personaltech'
          defaultValue={data.tiktok}
          onBlur={(e) =>
            dispatch({ type: 'update-tiktok', payload: { tiktok: e.target.value } })
          }
        />
      </div>
      <LabeledInput
        label="Insira um vídeo do youtube para sua apresentação"
        id="presentation_video"
        name="presentation_video"
        placeholder="https://www.youtube.com/watch?v=..."
        defaultValue={data.presentation_video}
        onBlur={(e) =>
          dispatch({ type: 'update-presentation_video', payload: { presentation_video: e.target.value } })
        }
      />
    </div>
  );
};
