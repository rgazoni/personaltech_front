import { GetPage } from '@/api/page';
import { UserImage } from '@/components/common/user-image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useId } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProfilePersonalCard = ({
  key,
  page,
}: {
  key: string;
  page: GetPage;
}) => {
  const id = useId() + key;
  const navigate = useNavigate();
  console.log(page);
  return (
    <div key={id} className="flex gap-4 max-h-min">
      <div className="flex w-full gap-8">
        <div className="w-96">
          <UserImage src={page.avatar} height="18" width="18" borderRadius="0.75" />
        </div>
        <div className="flex w-full flex-col gap-2 rounded-lg bg-tertiary-foreground px-10 py-6 grow justify-center">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold text-secondary">
              {page.page_name}
            </h2>
            <div className='flex items-center gap-2'>
              {page!.ratings && page!.ratings.total !== 0 && (
                <div className='flex gap-2 items-center'>
                  <p className={`text-nowrap text-[10px] font-light`}>
                    {page!.ratings.average.toFixed(1)} / 5
                  </p>
                  <div className='flex gap-1'>
                    {Array.from({ length: page!.ratings.average }, (_, index) => (
                      <Star key={index} size={16} strokeWidth={0} fill="#FFC728" />
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
          <div className="flex flex-wrap gap-2 pr-28">
            {page.expertises.map((expertise, index) => (
              <Badge key={index} variant="secondary" className="text-nowrap">
                {expertise}
              </Badge>
            ))}
          </div>
          <div className='pt-1'>
            <h3>{page.profession}</h3>
          </div>
          <p className="h-10 truncate text-wrap text-xs font-light pt-2 pr-36">
            {page.about_you.substring(0, 120) + '...'}
          </p>
          <div className="flex justify-between items-center">
            <div>
              {' '}
              <span className="text-xs font-light text-secondary">
                à partir de
              </span>{' '}
              <span className="pr-0.5">R$</span>
              {page.service_value.split('.')[0] +
                ',' +
                (page.service_value.split('.').length > 1
                  ? page.service_value.split('.')[1].length === 1
                    ? page.service_value.split('.')[1] + '0'
                    : page.service_value.split('.')[1]
                  : '00')}
              <span className="text-xs font-light text-secondary pl-0.5">
                / aula
              </span>
            </div>
            <Button className="rounded-full" onClick={() => navigate('/u/' + page.url)}>Saber mais</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
