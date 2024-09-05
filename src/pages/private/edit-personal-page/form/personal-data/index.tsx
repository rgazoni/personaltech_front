import { Button } from '@/components/ui/button';
import { AboutYou } from './about-you';
import { SocialMedia } from './social-media';
import { useEditPersonalContext } from '@/providers/edit-personal-page-provider';
import { useMutation } from '@tanstack/react-query';
import { updatePage } from '@/api/page';
import useAppStore, { User } from '@/store';
import { useToast } from '@/hooks/use-toast.hook';
import { useNavigate } from 'react-router-dom';

export const PersonalData = ({ user }: { user: User }) => {
  const { state } = useEditPersonalContext();
  const updatePageFields = useAppStore((state) => state.updatePartialPage);
  const page = useAppStore((state) => state.page);
  const navigate = useNavigate();

  const { notify } = useToast();

  console.log('page', page);
  console.log('user', user);

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
      navigate('/u/' + data.url);
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
          avatarFile: state.avatarFile,
          is_published: true,
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
            state.expertises.length === 0 ||
            user.is_cref_verified !== 'valid'
          }
        >
          {page.is_published ? "Atualizar página" : "Publicar página"}
        </Button>
      </div>
    </form>
  );
};

