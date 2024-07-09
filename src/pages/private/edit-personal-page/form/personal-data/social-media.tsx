import { LabeledInput } from '@/components/common/labeled-input';
import { useEditPersonalPageFormContext } from '@/providers/edit-personal-page-form';

export const SocialMedia = () => {
  const { dispatch } = useEditPersonalPageFormContext();
  return (
    <div className="mt-5 flex flex-col gap-5">
      <LabeledInput
        label="Whatsapp para contato dos alunos *"
        name="whatsapp"
        id="whatsapp"
        onChange={(e) =>
          dispatch({
            type: 'update-whatsapp',
            payload: { whatsapp: e.target.value },
          })
        }
      />
      <LabeledInput
        label="Instagram"
        name="instagram"
        id="instagram"
        onChange={(e) =>
          dispatch({
            type: 'update-instagram',
            payload: { instagram: e.target.value },
          })
        }
      />
      <LabeledInput
        label="TikTok"
        name="tiktok"
        id="tiktok"
        onChange={(e) =>
          dispatch({
            type: 'update-tiktok',
            payload: { tiktok: e.target.value },
          })
        }
      />
      <LabeledInput
        label="Youtube"
        name="youtube"
        id="youtube"
        onChange={(e) =>
          dispatch({
            type: 'update-youtube',
            payload: { youtube: e.target.value },
          })
        }
      />
      <LabeledInput
        label="Insira um link para um video de apresentação"
        id="presentation_video"
        name="presentation_video"
        onChange={(e) =>
          dispatch({
            type: 'update-presentation_video',
            payload: { presentation_video: e.target.value },
          })
        }
      />
    </div>
  );
};
