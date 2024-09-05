import { LabeledInput } from '@/components/common/labeled-input';
import { useEditPersonalContext } from '@/providers/edit-personal-page-provider';

type SocialMediaProps = {
  data: {
    whatsapp: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    presentation_video: string;
  };
};

export const SocialMedia = ({ data }: SocialMediaProps) => {
  const { dispatch } = useEditPersonalContext();

  return (
    <div className="mt-5 flex flex-col gap-5">
      <LabeledInput
        label="Whatsapp para contato dos alunos *"
        name="whatsapp"
        id="whatsapp"
        defaultValue={data.whatsapp}
        type="tel"
        onBlur={(e) =>
          dispatch({ type: 'update-whatsapp', payload: { whatsapp: e.target.value } })
        }
      />
      <LabeledInput
        label="Instagram"
        name="instagram"
        id="instagram"
        defaultValue={data.instagram}
        onBlur={(e) =>
          dispatch({ type: 'update-instagram', payload: { instagram: e.target.value } })
        }
      />
      <LabeledInput
        label="TikTok"
        name="tiktok"
        id="tiktok"
        defaultValue={data.tiktok}
        onBlur={(e) =>
          dispatch({ type: 'update-tiktok', payload: { tiktok: e.target.value } })
        }
      />
      <LabeledInput
        label="Youtube"
        name="youtube"
        id="youtube"
        defaultValue={data.youtube}
        onBlur={(e) =>
          dispatch({ type: 'update-youtube', payload: { youtube: e.target.value } })
        }
      />
      <LabeledInput
        label="Insira um link para um video de apresentação"
        id="presentation_video"
        name="presentation_video"
        defaultValue={data.presentation_video}
        onBlur={(e) =>
          dispatch({ type: 'update-presentation_video', payload: { presentation_video: e.target.value } })
        }
      />
    </div>
  );
};
