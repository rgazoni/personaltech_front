import { UserImage } from '@/components/common/user-image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

export const ProfilePersonalCard = () => {
  return (
    <div className="flex gap-4">
      <div className="flex gap-8">
        <UserImage src="" height="18" width="18" borderRadius="0.75" />
        <div className="flex flex-col gap-2 bg-tertiary-foreground py-6 px-10 rounded-lg">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold text-secondary">Manuela Silva</h2>
            <div className='flex'>
              <Star size={24} fill='#FFC728' strokeWidth={0} />
              <Star size={24} fill='#FFC728' strokeWidth={0} />
              <Star size={24} fill='#FFC728' strokeWidth={0} />
              <Star size={24} fill='#FFC728' strokeWidth={0} />
              <Star size={24} fill='#FFC728' strokeWidth={0} />
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">Musculação</Badge>
            <Badge variant="secondary">Crossfit</Badge>
          </div>
          <div>
            <h3>Personal Trainer</h3>
            <h3>CREF: 1454016-F/PA</h3>
          </div>
          <p>
            Manuela Silva é uma personal trainer com mais de 10 anos de
            experiência.
          </p>
          <div className="flex justify-between">
            <p>R$ 100,00/h</p>
            <Button>Saber mais</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
