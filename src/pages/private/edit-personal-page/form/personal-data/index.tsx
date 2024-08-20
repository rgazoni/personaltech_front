import { Button } from '@/components/ui/button';
import { AboutYou } from './about-you';
import { SocialMedia } from './social-media';
import { useEditPersonalContext } from '@/providers/edit-personal-page-provider';
import { useMutation } from '@tanstack/react-query';
import { updatePage } from '@/api/page';
import useAppStore from '@/store';
import { useToast } from '@/hooks/use-toast.hook';

export const PersonalData = () => {
  const { state } = useEditPersonalContext();
  const updatePageFields = useAppStore((state) => state.updatePartialPage);

  const { notify } = useToast();


  const aboutYou = {
    page_name: state.page_name,
    expertises: state.expertises,
    profession: state.profession,
    service_value: state.service_value,
    about_you: state.about_you,
  };

  const socialMedia = {
    whatsapp: state.whatsapp,
    instagram: state.instagram,
    tiktok: state.tiktok,
    youtube: state.youtube,
    presentation_video: state.presentation_video,
  };

  const mutation = useMutation({
    mutationFn: updatePage,
    onSuccess: (data) => {
      // Handle success (e.g., show a success message)
      updatePageFields(data);
      notify('success', 'Página criada com sucesso');
    },
    onError: (e) => {
      // Handle error (e.g., show an error message)
      console.log(e);
      notify('error', 'Erro ao criar página');
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const obj = {
          page_name: formData.get('page_name') as string,
          profession: formData.get('profession') as string,
          expertises: state.expertises,
          service_value: formData.get('service_value') as string,
          about_you: formData.get('about_you') as string,
          whatsapp: formData.get('whatsapp') as string,
          instagram: formData.get('instagram') as string,
          youtube: formData.get('youtube') as string,
          presentation_video: formData.get('presentation_video') as string,
          background_color: state.background_color,
        };

        // Trigger the mutation with the form data
        mutation.mutate(obj);
      }}
    >
      <AboutYou data={aboutYou} />
      <SocialMedia data={socialMedia} />
      <div className="my-10 flex w-full justify-end">
        <Button
          className="rounded-full px-8"
          type="submit"
          disabled={
            !state.page_name ||
            !state.profession ||
            !state.service_value ||
            !state.about_you ||
            !state.whatsapp ||
            state.expertises.length === 0
          }
        >
          Publicar página
        </Button>
      </div>
    </form>
  );
};

