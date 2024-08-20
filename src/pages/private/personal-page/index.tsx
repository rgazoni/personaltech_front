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
import { useEffect } from 'react';
import { Layout } from '@/components/common/layout';
import { Star } from 'lucide-react';

export const PersonalPage = () => {
  const params = useParams<{ path: string }>();
  const navigate = useNavigate();

  // TODO Meanwhile
  if (!params.path) {
    navigate('/');
  }

  const { data, isLoading } = useQuery({
    queryKey: ['page', params.path],
    queryFn: () => getPage(params.path!),
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div className="relative w-full">
      <Layout>
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
                <UserImage src="" height="22" width="22" borderRadius="0.75" />
                <div className="flex items-center justify-between px-4">
                  {data?.presentation_video && (
                    <button className="flex items-center gap-2">
                      <img src={playLogo} alt="play" className="h-7 w-7" />
                      <p className="text-center font-light text-primary">Ver vídeo</p>
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
                        <img src={youtubeLogo} alt="youtube" className="h-8 w-8" />
                      </button>
                    )}
                  </div>
                </div>
                <div className='border-primary border mt-16 rounded-lg p-8'>
                  <div className='flex justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='h-12 w-12 rounded-full bg-gray-600'></div>
                      <div>
                        <h6 className='text-lg text-secondary'>Carlos</h6>
                        <div className='flex gap-1'>
                          <Star size={16} strokeWidth={0} fill='#FFC728' />
                          <Star size={16} strokeWidth={0} fill='#FFC728' />
                          <Star size={16} strokeWidth={0} fill='#FFC728' />
                          <Star size={16} strokeWidth={0} fill='#FFC728' />
                          <Star size={16} strokeWidth={0} fill='#FFC728' />
                        </div>
                      </div>
                    </div>
                    <p className='text-muted-foreground font-light text-sm pt-1'>10/10/2021</p>
                  </div>
                  <div className='mt-4 rounded-lg pl-16'>
                    <p className='text-sm text-muted-foreground'>Adorei o atendimento do Carlos, estou fazendo acompanhamento com ele há 2 meses e já vejo resultados.</p>
                  </div>
                </div>
                <div className='mt-4 mx-auto'>
                  <span className='cursor-pointer text-primary'>Carregar mais comentários</span>
                </div>
              </div>

              {/* Right column  */}
              <div className="grow">
                <div className="flex grow gap-6">
                  <div className="mt-14 flex flex-col gap-5">
                    <h1 className="text-nowrap text-6xl font-bold text-white">
                      {data!.page_name}
                    </h1>
                    <div className="flex gap-2">
                      {data!.expertises.map((expertise, index) => (
                        <BadgeExpertise key={index} expertise={expertise} />
                      ))}
                    </div>
                    <div>
                      <h2 className="text-lg font-light text-white">
                        {data!.profession}
                      </h2>
                      <h2 className="text-bg mt-1 font-light text-white">CREF 213123-G/SP</h2>
                    </div>
                  </div>
                </div>
                <div className='pr-12 pb-20'>
                  <div className="mt-32">
                    <p className="text-wrap font-light text-tertiary text-lg">
                      {data!.about_you}
                    </p>
                  </div>
                  <div className="mt-28 flex w-full items-center justify-between gap-6 rounded-xl bg-[#F1F1F1] py-8 px-12">
                    <p className="text-3xl font-bold text-secondary">
                      R${data!.service_value}
                      <span className="pl-1 text-xl font-light">/aula</span>
                    </p>
                    <Button
                      variant="default"
                      className="flex items-center gap-2 rounded-full px-14 py-8"
                    >
                      <p className='text-lg'>Agendar aula</p>
                      <img src={wppLogo} alt="whatsapp" className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};
