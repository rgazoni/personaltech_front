import { Button } from '@/components/ui/button';
import { AboutYou } from './about-you';
import { SocialMedia } from './social-media';
import { useEditPersonalPageFormContext } from '@/providers/edit-personal-page-form';

export const PersonalData = () => {
  const { state } = useEditPersonalPageFormContext();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const obj = {
          page_name: formData.get('page_name') as string,
          profession: formData.get('profession') as string,
          service_value: formData.get('service_value') as string,
          about_you: formData.get('about_you') as string,
          whatsapp: formData.get('whatsapp') as string,
          instagram: formData.get('instagram') as string,
          tiktok: formData.get('tiktok') as string,
          youtube: formData.get('youtube') as string,
          presentation_video: formData.get('presentation_video') as string,
        };
        //TODO: validation of the fields, wpp correct, value correct, etc
        console.log(obj);
      }}
    >
      <AboutYou />
      <SocialMedia />
      <div className="my-10 flex w-full justify-end">
        <Button
          className="rounded-full px-8"
          type="submit"
          disabled={
            !state.page_name ||
            !state.profession ||
            !state.service_value ||
            !state.about_you ||
            !state.whatsapp
          }
        >
          Publicar página
        </Button>
      </div>
    </form>
  );
};
