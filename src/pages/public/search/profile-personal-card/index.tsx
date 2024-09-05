import { UserImage } from '@/components/common/user-image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Page } from '@/store';
import { Star } from 'lucide-react';
import { useId } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProfilePersonalCard = ({
  key,
  page,
}: {
  key: string;
  page: Page;
}) => {
  const id = useId() + key;
  const navigate = useNavigate();
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
            <div className="flex">
              <Star size={24} fill="#FFC728" strokeWidth={0} />
              <Star size={24} fill="#FFC728" strokeWidth={0} />
              <Star size={24} fill="#FFC728" strokeWidth={0} />
              <Star size={24} fill="#FFC728" strokeWidth={0} />
              <Star size={24} fill="#FFC728" strokeWidth={0} />
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
