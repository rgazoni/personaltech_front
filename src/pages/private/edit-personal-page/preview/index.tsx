import { UserImage } from '@/components/common/user-image';
import { BadgeExpertise } from './badge-expertise';
import { useEditPersonalContext } from '@/providers/edit-personal-page-provider';
import useAppStore from '@/store';
import { Button } from '@/components/ui/button';
import wppLogo from '@/assets/wpp.svg';
import playLogo from '@/assets/play.svg';
import instagramLogo from '@/assets/insta_logo.svg';
import youtubeLogo from '@/assets/yt_logo.svg';
import React, { useState } from 'react';
import { colorsDarker } from '../form/color-opts/data';
import { BookOpen, Dumbbell, MapPin, X } from 'lucide-react';
import tiktokLogo from '@/assets/tiktok.svg';

// Function to extract the video ID from a YouTube URL
const getYouTubeVideoId = (url: string) => {
  const videoId = url.split('v=')[1];
  const ampersandPosition = videoId?.indexOf('&');
  return ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;
};



export const PersonalPreviewPage = () => {

  const [isModalOpenVideo, setIsModalOpenVideo] = useState(false);

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
    avatar: state.avatar,
    whatsapp: state.whatsapp,
    tiktok: state.tiktok,
    city: state.city,
    state: state.state,
  };

  const [isDarkerColor, __] = React.useState(
    !colorsDarker.includes(state.background_color)
  );
  const color = isDarkerColor ? 'text-secondary' : 'text-white';

  const handleOpenModalVideo = () => {
    setIsModalOpenVideo(true);
  }
  const handleCloseModalVideo = () => {
    setIsModalOpenVideo(false);
  }

  return (
    <div className="relative w-full">
      <div
        className="absolute left-0 top-0 z-0 h-[20rem] w-full rounded-t-md"
        style={{ background: info.backgroundColor }}
      ></div>
      <div className="relative z-10 flex gap-8 pl-16 pt-16">

        {/* Left column  */}
        <div className="flex flex-col gap-3">
          <UserImage src={info.avatar} height="18" width="18" borderRadius="0.75" />
          <div className="flex justify-between px-2 items-center">
            {info.presentation_video && (
              <>
                <button className='flex gap-2 items-center' onClick={handleOpenModalVideo}>
                  <img src={playLogo} alt="play" className="h-5 w-5" />
                  <p className='text-primary font-light text-center'>Ver vídeo</p>
                </button>
                {isModalOpenVideo && (
                  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                  >
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                      <X className="absolute top-5 right-5 m-2 text-white cursor-pointer" onClick={handleCloseModalVideo} />
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(info.presentation_video!)}`}
                        title={info.page_name + ' - video de apresentação'}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
              </>

            )}
            <div className='flex gap-3 items-center'>
              {info.instagram && (
                <a
                  className="ml-1 flex gap-2"
                  href={'https://www.instagram.com/' + info.instagram.replace('@', '')}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ visibility: info?.instagram ? 'visible' : 'hidden' }}
                >
                  <img
                    src={instagramLogo}
                    alt="instagram"
                    className="h-5 w-5"
                  />
                </a>

              )}
              {info.youtube && (
                <button className='flex gap-2 ml-1'>
                  <img src={youtubeLogo} alt="youtube" className="h-5 w-5" />
                </button>
              )}
              {info.whatsapp && (
                < a
                  className="ml-1 flex gap-2"
                  href={`https://wa.me//55${info.whatsapp}?text=Te%20encontrei%20na%20PersonalTech%20e%20estou%20interessado%20no%20seu%20serviço`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={wppLogo} alt="whatsapp" className="h-5 w-5" />
                </a>
              )}
              {info.tiktok && (
                <a
                  className="ml-1 flex gap-2"
                  href={`https://www.tiktok.com/` + info.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ visibility: info?.tiktok ? 'visible' : 'hidden' }}
                >

                  <img
                    src={tiktokLogo}
                    alt="tiktok"
                    className="h-5 w-5"
                  />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right column  */}
        <div className="grow">
          <div className="flex grow gap-6">
            <div className="mt-12 flex flex-col gap-5">
              <h1 className={`text-nowrap text-4xl font-bold ${color}`}>
                {info.page_name}
              </h1>
              <div className="flex gap-2 flex-wrap">
                {info.expertises.map((expertise, index) => (
                  <BadgeExpertise key={index} expertise={expertise} />
                ))}
              </div>

              <div>
                <div className='flex gap-2 items-center'>
                  <Dumbbell className={`h-5 w-5 ${color}`} strokeWidth={1} />
                  <h2 className={`text-lg font-light ${color}`}>
                    {info!.profession}
                  </h2>
                </div>
                {info!.cref && (
                  <div className='flex gap-2 items-start'>
                    <div className='flex gap-2 items-center'>
                      <BookOpen className={`h-5 w-5 ${color}`} strokeWidth={1} />
                      <h2 className={`text-bg mt-1 font-light ${color}`}>
                        CREF {info!.cref}
                      </h2>
                    </div>

                  </div>
                )}
                <div className='flex gap-1 items-center'>
                  <MapPin className={`h-5 w-5 ${color}`} strokeWidth={1} />
                  <h2 className={`${color} font-light`}>{info!.city}, {info!.state}</h2>
                </div>
              </div>

            </div>
          </div>
          <div className="mt-20">
            {info.about_you || info.about_you !== '' ? (
              <>
                <h2 className="text-xl font-bold text-secondary">
                  Sobre
                </h2>
                <p className="whitespace-pre-wrap text-wrap pt-3 font-light text-tertiary">
                  {info.about_you}
                </p>
              </>
            )
              :
              (
                <div className='w-full h-64 rounded border pl-4 pt-4'>
                  <p className='text-sm font-light'>Conte um pouco sobre você 😀</p>
                </div>
              )}
          </div>
          <div className="mx-auto mt-24 flex w-full items-center justify-between gap-6 rounded-xl bg-[#F1F1F1] p-6">
            <div>
              {' '}
              <span className="pr-1 font-light text-secondary">
                à partir de
              </span>{' '}
              <span className="pr-1 text-2xl">R$</span>
              <p className="inline pr-1 text-2xl">
                {info?.service_value.split('.')[0] +
                  ',' +
                  (info!.service_value.split('.').length > 1
                    ? info!.service_value.split('.')[1].length === 1
                      ? info!.service_value.split('.')[1] + '0'
                      : info!.service_value.split('.')[1]
                    : '00')}
              </p>
              <span className="pl-0.5 font-light text-secondary">
                / aula
              </span>
            </div>
            <Button
              variant="default"
              className="flex items-center gap-2 rounded-full px-8 py-6"
            >
              <p>Agendar aula</p>
            </Button>
          </div>
        </div>
      </div>
    </div >
  );
};
