import { UserImage } from '@/components/common/user-image';
import { BadgeExpertise } from './badge-expertise';

export const PersonalPreviewPage = () => {

  const info = {
    page_name: 'Nome da página',
    backgroundColor: '#272727',
    expertises: ['Especialidades'],
    profession: 'Profissão',
    cref: 'CREF XXXXXX-X/XX'
  }

  return (
    <div className="relative w-full">
      <div
        className="absolute left-0 top-0 z-0 h-[19rem] w-full rounded-t-md"
        style={{ background: info.backgroundColor }}
      ></div>
      <div className="relative z-10 flex gap-8 pl-16 pt-16">
        {/* Left column  */}
        <div>
          <UserImage
            src=""
            height="18"
            width="18"
            borderRadius="0.75"
          />
        </div>

        {/* Right column  */}
        <div className='grow'>
          <div className="flex gap-6 grow">
            <div className="mt-14 flex flex-col gap-5">
              <h1 className="text-4xl font-bold text-white text-nowrap">{info.page_name}</h1>
              <div className="flex gap-2">
                {info.expertises.map((expertise, index) => (
                  <BadgeExpertise key={index} expertise={expertise} />
                ))}
              </div>
              <div>
                <h2 className="text-bg font-light text-white">{info.profession}</h2>
                <h2 className="text-bg font-light text-white mt-1">{info.cref}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
