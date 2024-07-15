import { LabeledInput } from '@/components/common/labeled-input';
import { pageSlice } from '@/features/page';
import { useAppDispatch, useAppSelector } from '@/features/store';

export const SocialMedia = () => {
  const { page } = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();

  return (
    <div className="mt-5 flex flex-col gap-5">
      <LabeledInput
        label="Whatsapp para contato dos alunos *"
        name="whatsapp"
        id="whatsapp"
        defaultValue={page.whatsapp}
        onBlur={(e) =>
          dispatch(pageSlice.actions.updateWhatsapp(e.target.value))
        }
      />
      <LabeledInput
        label="Instagram"
        name="instagram"
        id="instagram"
        defaultValue={page.instagram}
        onBlur={(e) =>
          dispatch(pageSlice.actions.updateInstagram(e.target.value))
        }
      />
      <LabeledInput
        label="TikTok"
        name="tiktok"
        id="tiktok"
        defaultValue={page.tiktok}
        onBlur={(e) =>
          dispatch(pageSlice.actions.updateTiktok(e.target.value))
        }
      />
      <LabeledInput
        label="Youtube"
        name="youtube"
        id="youtube"
        defaultValue={page.youtube}
        onBlur={(e) =>
          dispatch(pageSlice.actions.updateYoutube(e.target.value))
        }
      />
      <LabeledInput
        label="Insira um link para um video de apresentação"
        id="presentation_video"
        name="presentation_video"
        defaultValue={page.presentation_video}
        onBlur={(e) =>
          dispatch(pageSlice.actions.updatePresentationVideo(e.target.value))
        }
      />
    </div>
  );
};
