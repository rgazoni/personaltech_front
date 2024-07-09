import { Button } from '@/components/ui/button';
import { RootState } from '@/features/store';
import { useSelector } from 'react-redux';

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

const nav_bar = (
  <div className="hidden gap-3 px-6 md:flex lg:flex">
    <Button
      variant={null}
      className={`font-normal text-muted ${variant['light'].button_hollowed}`}
    >
      Dar aulas
    </Button>
    <Button className={`px-6 ${variant['light'].button_cta}`}>Login</Button>
  </div>
);

const logged_nav_bar = (
  <div className="hidden gap-6 px-6 md:flex lg:flex text-muted">
    <p>Buscar aulas</p>
    <p>Meu perfil</p>
  </div>
);

export const Header = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <header className="relative z-50 flex items-center justify-between pb-20 pt-8">
      <h1 className={`text-4xl font-bold text-primary ${variant['light'].logo}`}>
        Personal<span className="font-light italic">tech</span>
      </h1>
      {user.is_authenticated ? nav_bar : logged_nav_bar}
    </header>
  );
};
