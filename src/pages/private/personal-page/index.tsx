import { UserImage } from '@/components/common/user-image';
import { BadgeExpertise } from './badge-expertise';
import { Button } from '@/components/ui/button';
import wppLogo from '@/assets/wpp.svg';
import playLogo from '@/assets/play.svg';
import instagramLogo from '@/assets/insta_logo.svg';
import tiktokLogo from '@/assets/tiktok.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getPage } from '@/api/page';
import { Layout } from '@/components/common/layout';
import { BookOpen, Dumbbell, Info, MapPin, Pin, Star, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { isColorDarker } from '../edit-personal-page/form/color-opts/data';
import { RatingInfo, getRatings } from '@/api/ratings';
import { AvatarProfileImg } from '@/components/common/avatar-profile-img';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import useAppStore from '@/store';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const CommentsSection = ({ data }: { data: RatingInfo }) => {
  const date = new Date(data.userResponseAt);

  return (
    <div className="rounded-lg border border-primary p-8">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <AvatarProfileImg src={data.avatar} alt={data.full_name} size={48} />
          <div>
            <h6 className="text-lg text-secondary">{data.full_name}</h6>
            <div className="flex gap-1">
              {Array.from({ length: data.rating }, (_, index) => (
                <Star key={index} size={16} strokeWidth={0} fill="#FFC728" />
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-4 pt-1">
          <p className="h-fit text-sm font-light text-muted-foreground">
            {date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}
          </p>
        </div>
      </div>
      <div className="mt-4 rounded-lg pl-16">
        <p className="text-sm text-muted-foreground">{data.comment}</p>
      </div>
    </div>
  );
};

// Function to extract the video ID from a YouTube URL
const getYouTubeVideoId = (url: string) => {
  const videoId = url.split('v=')[1];
  const ampersandPosition = videoId?.indexOf('&');
  return ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;
};


export const PersonalPage = () => {
  const params = useParams<{ path: string }>();
  const navigate = useNavigate();
  const [acceptedData, setAcceptedData] = React.useState<RatingInfo[]>();
  const [isLoadingAccepted, setIsLoadingAccepted] =
    React.useState<boolean>(true);

  // TODO Meanwhile
  if (!params.path) {
    navigate('/');
  }

  const user = useAppStore((state) => state.user);
  const client = useAppStore((state) => state.client);

  const { data, isLoading } = useQuery({
    queryKey: ['page', params.path],
    queryFn: () => getPage(params.path!),
  });

  const mutateComments = useMutation({
    mutationFn: getRatings,
    mutationKey: ['acceptedReqs', data],
    onSuccess: (data) => {
      console.log(data);
      setIsLoadingAccepted(false);
      setAcceptedData(data);
    },
  });

  const [isColorTonePersonalPageDark, setIsColorTonePersonalPageDark] =
    React.useState<boolean>();

  useEffect(() => {
    if (data) {
      setIsColorTonePersonalPageDark(
        window.location.pathname.includes('/u/') &&
        isColorDarker(data.background_color)
      );
      mutateComments.mutate({ token: data.personal_id, status: 'accepted' });
    }
  }, [data]);

  const color = isColorTonePersonalPageDark ? 'text-white' : 'text-secondary';

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="relative w-full">
      {data && (
        <Layout bgColorPP={color}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <div
                className="absolute left-0 top-0 z-0 h-[30rem] w-full rounded-t-md"
                style={{ background: data!.background_color }}
              ></div>
              <div className="relative z-10 flex gap-20 pl-16 pt-5">
                {/* Left column  */}
                <div className="flex flex-col gap-5">
                  <UserImage
                    src={data?.avatar}
                    height="22"
                    width="22"
                    borderRadius="0.75"
                  />
                  <div className="flex items-center justify-between px-4">
                    {data?.presentation_video && (
                      <button
                        className="flex items-center gap-2"
                        onClick={handleOpenModal} // Opens the modal on click
                      >
                        <img src={playLogo} alt="play" className="h-6 w-6" />
                        <p className="text-center text-primary">Ver vídeo</p>
                      </button>
                    )}
                    {/* Modal to display YouTube video */}
                    {isModalOpen && (
                      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                      >
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                          <X className="absolute top-5 right-5 m-2 text-white" onClick={handleCloseModal} />
                          <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${getYouTubeVideoId(data.presentation_video!)}`}
                            title={data.page_name + ' - video de apresentação'}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      {data?.instagram && (
                        <a
                          className="ml-1 flex gap-2"
                          href={'https://www.instagram.com/' + data.instagram.replace('@', '')}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={instagramLogo}
                            alt="instagram"
                            className="h-6 w-6"
                          />
                        </a>
                      )}
                      {data?.whatsapp && (
                        <>
                          {!user.id && !client.id ? (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <img src={wppLogo} alt="whatsapp" className="h-6 w-6 cursor-pointer" />
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>É necessário estar logado</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Para poder enviar mensagens é necessário estar logado no site,
                                    caso você já tenha uma conta, clique em continuar para logar. Caso
                                    não tenha, clique em cadastrar.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter
                                  style={{ display: 'flex', justifyContent: 'space-between' }}
                                >
                                  <AlertDialogCancel>Fechar</AlertDialogCancel>
                                  <div className='flex gap-2'>
                                    <AlertDialogCancel onClick={() => navigate('/signup')}>Cadastrar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => navigate('/login')}>Logar</AlertDialogAction>
                                  </div>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          ) : (
                            <a
                              className="ml-1 flex gap-2"
                              href={`https://wa.me//55${data.whatsapp}?text=Te%20encontrei%20na%20PersonalTech%20e%20estou%20interessado%20no%20seu%20serviço`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img src={wppLogo} alt="whatsapp" className="h-6 w-6" />
                            </a>
                          )}
                        </>
                      )}

                      {data?.tiktok && (
                        <a
                          className="ml-1 flex gap-2"
                          href={`https://www.tiktok.com/` + data.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                        >

                          <img
                            src={tiktokLogo}
                            alt="youtube"
                            className="h-6 w-6"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="mt-14 flex flex-col gap-6">
                    {isLoadingAccepted ? (
                      <></>
                    ) : acceptedData && acceptedData.length !== 0 ? (
                      acceptedData.map((rate: RatingInfo) => (
                        <CommentsSection key={rate.trainee_id} data={rate} />
                      ))
                    ) : (
                      <div className="text-center text-sm font-light text-muted">
                        Nenhum comentário ainda
                      </div>
                    )}
                  </div>
                </div>

                {/* Right column  */}
                <div className="grow">
                  <div className="flex grow gap-6">
                    <div className="mt-14 flex flex-col gap-5">
                      <div className='flex w-full justify-between items-start'>
                        <div className='flex w-full gap-5 flex-col'>
                          <h1 className={`text-nowrap text-6xl font-bold ${color}`}>
                            {data!.page_name}
                          </h1>
                          <div className="flex flex-wrap gap-2">
                            {data!.expertises.map((expertise, index) => (
                              <BadgeExpertise key={index} expertise={expertise} />
                            ))}
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          {data!.ratings && data!.ratings.total !== 0 && (
                            <div className='flex gap-2 items-center'>
                              <p className={`text-nowrap text-[10px] font-light ${color}`}>
                                {data!.ratings.average.toFixed(1)} / 5
                              </p>
                              <div className='flex gap-1'>
                                {Array.from({ length: data!.ratings.average }, (_, index) => (
                                  <Star key={index} size={16} strokeWidth={0} fill="#FFC728" />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='flex items-start flex-col gap-1'>
                        <div className='flex gap-2 items-center'>
                          <Dumbbell className={`h-5 w-5 ${color}`} strokeWidth={1} />
                          <h2 className={`text-lg font-light ${color}`}>
                            {data!.profession}
                          </h2>
                        </div>
                        {data!.cref && (
                          <div className='flex gap-2 items-start'>
                            <div className='flex gap-2 items-center'>
                              <BookOpen className={`h-5 w-5 ${color}`} strokeWidth={1} />
                              <h2 className={`text-bg mt-1 font-light ${color}`}>
                                CREF {data!.cref}
                              </h2>
                            </div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className={`h-3.5 w-3.5 cursor-pointer ${color} mt-1`} />
                                </TooltipTrigger>
                                <TooltipContent align='start' >
                                  <p className='w-64 text-xs text-muted'>Caso queira checar mais informações desse CREF, visite o site da CONFEF ou mande-nos um email: personaltech@gmail.com!</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        )}
                        <div className='flex gap-1 items-center'>
                          <MapPin className={`h-5 w-5 ${color}`} strokeWidth={1} />
                          <h2 className={`${color} font-light`}>{data!.city}, {data!.state}</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pb-18 pr-12">
                    <div className="mt-24">
                      <h2 className="text-3xl font-bold text-secondary">
                        Sobre
                      </h2>
                      <p className="whitespace-pre-wrap text-wrap pt-5 text-lg font-light text-tertiary">
                        {data!.about_you}
                      </p>
                    </div>
                    <div className="mt-28 flex w-full items-center justify-between gap-6 rounded-xl bg-[#F1F1F1] px-12 py-8">
                      <div>
                        {' '}
                        <span className="pr-1 font-light text-secondary">
                          à partir de
                        </span>{' '}
                        <span className="pr-1 text-2xl">R$</span>
                        <p className="inline pr-1 text-2xl">
                          {data?.service_value.split('.')[0] +
                            ',' +
                            (data!.service_value.split('.').length > 1
                              ? data!.service_value.split('.')[1].length === 1
                                ? data!.service_value.split('.')[1] + '0'
                                : data!.service_value.split('.')[1]
                              : '00')}
                        </p>
                        <span className="pl-0.5 font-light text-secondary">
                          / aula
                        </span>
                      </div>
                      {!user.id && !client.id ? (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="default"
                              className="flex items-center gap-2 rounded-full px-14 py-8"
                            >
                              <p className="text-lg">Agendar aula</p>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>É necessário estar logado</AlertDialogTitle>
                              <AlertDialogDescription>
                                Para poder enviar mensagens é necessário estar logado no site,
                                caso você já tenha uma conta, clique em continuar para logar. Caso
                                não tenha, clique em cadastrar.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter
                              style={{ display: 'flex', justifyContent: 'space-between' }}
                            >
                              <AlertDialogCancel>Fechar</AlertDialogCancel>
                              <div className='flex gap-2'>
                                <AlertDialogCancel onClick={() => navigate('/signup')}>Cadastrar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => navigate('/login')}>Logar</AlertDialogAction>
                              </div>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      ) : (
                        <Button
                          variant="default"
                          className="flex items-center gap-2 rounded-full px-14 py-8"
                          onClick={() => navigate('/message?id=' + data.uid_chat)}
                        >
                          <p className="text-lg">Agendar aula</p>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Layout>
      )}
    </div>
  );
};
