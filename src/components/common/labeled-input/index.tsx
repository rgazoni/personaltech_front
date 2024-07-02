import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useId } from 'react';

// @types
type LabeledInputProps = {
  label: string;
  labelClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const LabeledInput = ({
  label,
  labelClassName,
  ...props
}: LabeledInputProps) => {
  const id = useId() + props.id;
  return (
    <div className="flex flex-col">
      <Label
        className={`pb-2 text-sm font-light text-tertiary ${labelClassName}`}
        htmlFor={id}
      >
        {label}
      </Label>
      <Input {...props} id={id} />
    </div >
  );
};
