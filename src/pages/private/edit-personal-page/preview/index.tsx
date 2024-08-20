import { UserImage } from '@/components/common/user-image';
import { BadgeExpertise } from './badge-expertise';
import { useEditPersonalContext } from '@/providers/edit-personal-page-provider';
import useAppStore from '@/store';
import { Button } from '@/components/ui/button';
import wppLogo from '@/assets/wpp.svg';
import playLogo from '@/assets/play.svg';
import instagramLogo from '@/assets/insta_logo.svg';
import youtubeLogo from '@/assets/yt_logo.svg';

export const PersonalPreviewPage = () => {
  const defaultInfo = {
    page_name: 'Nome da página',
    backgroundColor: '#272727',
    expertises: ['Especialidades'],
    profession: 'Profissão',
    cref: 'CREF XXXXXX-X/XX',
    service_value: 'XX,XX',
  };

  const user = useAppStore((state) => state.user);
  const { state } = useEditPersonalContext();
  const info = {
    page_name: state.page_name || defaultInfo.page_name,
    backgroundColor: state.background_color || defaultInfo.backgroundColor,
    expertises: state.expertises.length ? state.expertises : defaultInfo.expertises,
    profession: state.profession || defaultInfo.profession,
    cref: user.cref || defaultInfo.cref,
    service_value: state.service_value || defaultInfo.service_value,
    about_you: state.about_you,
    presentation_video: state.presentation_video,
    instagram: state.instagram,
    youtube: state.youtube,
  };

  return (
    <div className="relative w-full">
      <div
        className="absolute left-0 top-0 z-0 h-[19rem] w-full rounded-t-md"
        style={{ background: info.backgroundColor }}
      ></div>
      <div className="relative z-10 flex gap-8 pl-16 pt-16">

        {/* Left column  */}
        <div className="flex flex-col gap-3">
          <UserImage src="" height="18" width="18" borderRadius="0.75" />
          <div className="flex justify-between px-2 items-center">
            {info.presentation_video && (
              <button className='flex gap-2 items-center'>
                <img src={playLogo} alt="play" className="h-5 w-5" />
                <p className='text-primary font-light text-center'>Ver vídeo</p>
              </button>
            )}
            <div className='flex gap-3 items-center'>
              {info.instagram && (
                <button className='flex gap-2 ml-1'>
                  <img src={instagramLogo} alt="instagram" className="h-5 w-5" />
                </button>
              )}
              {info.youtube && (
                <button className='flex gap-2 ml-1'>
                  <img src={youtubeLogo} alt="youtube" className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right column  */}
        <div className="grow">
          <div className="flex grow gap-6">
            <div className="mt-14 flex flex-col gap-5">
              <h1 className="text-nowrap text-4xl font-bold text-white">
                {info.page_name}
              </h1>
              <div className="flex gap-2">
                {info.expertises.map((expertise, index) => (
                  <BadgeExpertise key={index} expertise={expertise} />
                ))}
              </div>
              <div>
                <h2 className="text-bg font-light text-white">
                  {info.profession}
                </h2>
                <h2 className="text-bg mt-1 font-light text-white">
                  {info.cref}
                </h2>
              </div>
            </div>
          </div>
          <div className="mt-32">
            {info.about_you || info.about_you !== '' ? (
              <p className="text-wrap text-tertiary font-light">
                {info.about_you}
              </p>
            )
              :
              (
                <div className='w-full h-64 rounded border pl-4 pt-4'>
                  <p className='text-sm font-light'>Conte um pouco sobre você 😀</p>
                </div>
              )}
          </div>
          <div className="mx-auto mt-24 flex w-full items-center justify-between gap-6 rounded-xl bg-[#F1F1F1] p-6">
            <p className="text-2xl font-bold text-secondary">
              R${info.service_value}
              <span className="pl-1 text-xl font-light">/aula</span>
            </p>
            <Button
              variant="default"
              className="flex items-center gap-2 rounded-full px-8 py-6"
            >
              <p>Agendar aula</p>
              <img src={wppLogo} alt="whatsapp" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
