import { Button } from '@/components/ui/button';

const variant = {
  light: {
    logo: 'text-primary',
    button_cta: '',
    button_hollowed: 'text-muted',
  },
  dark: {
    logo: 'text-white',
    button_cta: 'bg-white text-secondary hover:bg-secondary-foreground',
    button_hollowed: 'text-white',
  },
};

export const Header = () => {
  return (
    <header className="relative z-50 flex items-center justify-between pb-20 pt-8">
      <h1 className={`text-4xl font-bold text-primary ${variant['dark'].logo}`}>
        Personal<span className="font-light italic">tech</span>
      </h1>
      <div className="hidden gap-3 px-6 md:flex lg:flex">
        <Button
          variant={null}
          className={`font-normal text-muted ${variant['dark'].button_hollowed}`}
        >
          Dar aulas
        </Button>
        <Button className={`px-6 ${variant['dark'].button_cta}`}>Login</Button>
      </div>
    </header>
  );
};
