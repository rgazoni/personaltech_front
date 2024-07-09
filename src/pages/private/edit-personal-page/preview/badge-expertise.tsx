import { Badge } from '@/components/ui/badge';
import { useId } from 'react';

type BadgeExpertiseProps = {
  expertise: string;
};

export const BadgeExpertise = ({ expertise }: BadgeExpertiseProps) => {
  const key = useId() + expertise;
  return (
    <div>
      <Badge key={key} className="bg-black hover:bg-black">
        {expertise}
      </Badge>
    </div>
  );
};
