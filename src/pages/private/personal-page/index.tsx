import { UserImage } from '@/components/common/user-image';
import { BadgeExpertise } from './badge-expertise';
import { Button } from '@/components/ui/button';
import wppLogo from '@/assets/wpp.svg';
import playLogo from '@/assets/play.svg';
import instagramLogo from '@/assets/insta_logo.svg';
import youtubeLogo from '@/assets/yt_logo.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPage } from '@/api/page';
import { Layout } from '@/components/common/layout';
import { Star } from 'lucide-react';
import React, { useEffect } from 'react';
import useAppStore from '@/store';
import { colorsDarker, isColorDarker } from '../edit-personal-page/form/color-opts/data';
import { RatingInfo, getRatings } from '@/api/ratings';
import { AvatarProfileImg } from '@/components/common/avatar-profile-img';

const CommentsSection = ({ data }: { data: RatingInfo }) => {
  const date = new Date(data.userResponseAt);

  return (

    <div className="rounded-lg border border-primary p-8">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <AvatarProfileImg
            src={data.avatar}
            alt={data.full_name}
            size={48}
          />
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
            {date.getDate() +
              '/' +
              date.getMonth() +
              '/' +
              date.getFullYear()}
          </p>
        </div>
      </div>
      <div className="mt-4 rounded-lg pl-16">
        <p className="text-sm text-muted-foreground">{data.comment}</p>
      </div>
    </div>
  );
};

export const PersonalPage = () => {
  const params = useParams<{ path: string }>();
  const page = useAppStore((state) => state.page);
  const user = useAppStore((state) => state.user);
  const navigate = useNavigate();

  // TODO Meanwhile
  if (!params.path) {
    navigate('/');
  }

  const { data, isLoading } = useQuery({
    queryKey: ['page', params.path],
    queryFn: () => getPage(params.path!),
  });

  const { data: acceptedData, isLoading: isLoadingAccepted } = useQuery({
    queryKey: ['acceptedReqs', user.token],
    queryFn: () => getRatings(user.token, 'accepted'),
  });

  const [isColorTonePersonalPageDark, setIsColorTonePersonalPageDark] = React.useState<boolean>();

  useEffect(() => {
    if (data) {
      setIsColorTonePersonalPageDark(
        window.location.pathname.includes('/u/') &&
        isColorDarker(data.background_color)
      );
    }
  }, [data]);

  const color = isColorTonePersonalPageDark ? 'text-white' : 'text-secondary';

  return (
    <div className="relative w-full">
      {data && <Layout bgColorPP={color}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div
              className="absolute left-0 top-0 z-0 h-[28rem] w-full rounded-t-md"
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
                    <button className="flex items-center gap-2">
                      <img src={playLogo} alt="play" className="h-7 w-7" />
                      <p className="text-center font-light text-primary">
                        Ver vídeo
                      </p>
                    </button>
                  )}
                  <div className="flex items-center gap-3">
                    {data?.instagram && (
                      <button className="ml-1 flex gap-2">
                        <img
                          src={instagramLogo}
                          alt="instagram"
                          className="h-7 w-7"
                        />
                      </button>
                    )}
                    {data?.youtube && (
                      <button className="ml-1 flex gap-2">
                        <img
                          src={youtubeLogo}
                          alt="youtube"
                          className="h-8 w-8"
                        />
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-14 flex flex-col gap-6">
                  {isLoadingAccepted ? (
                    <p>Loading...</p>
                  ) : acceptedData && acceptedData.length !== 0 ? (
                    acceptedData.map((rate: RatingInfo) => (
                      <CommentsSection key={rate.trainee_id} data={rate} />
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              {/* Right column  */}
              <div className="grow">
                <div className="flex grow gap-6">
                  <div className="mt-14 flex flex-col gap-5">
                    <h1 className={`text-nowrap text-6xl font-bold ${color}`}>
                      {data!.page_name}
                    </h1>
                    <div className="flex gap-2">
                      {data!.expertises.map((expertise, index) => (
                        <BadgeExpertise key={index} expertise={expertise} />
                      ))}
                    </div>
                    <div>
                      <h2 className={`text-lg font-light ${color}`}>
                        {data!.profession}
                      </h2>
                      <h2 className={`text-bg mt-1 font-light ${color}`}>
                        CREF {data!.cref}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="pb-20 pr-12">
                  <div className="mt-24">
                    <h2 className="text-3xl font-bold text-secondary">Sobre</h2>
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

                    {
                      // <p className="text-3xl font-bold text-secondary">
                      //   R${data!.service_value}
                      //   <span className="pl-1 text-xl font-light">/aula</span>
                      // </p>
                    }
                    <Button
                      variant="default"
                      className="flex items-center gap-2 rounded-full px-14 py-8"
                    >
                      <p className="text-lg">Agendar aula</p>
                      <img src={wppLogo} alt="whatsapp" className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>}
    </div>
  );
};
