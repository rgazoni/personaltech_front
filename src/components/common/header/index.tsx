import { Button } from '@/components/ui/button';
import useAppStore, {
  Client,
  Page,
  User,
  initialClient,
  initialPage,
  initialUser,
} from '@/store';
import { AvatarProfileImg } from '../avatar-profile-img';
import {
  Bell,
  ChevronDown,
  Eye,
  LogOut,
  Settings,
  User as UserIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { colorsDarker, isColorDarker } from '@/pages/private/edit-personal-page/form/color-opts/data';
import { useQuery } from '@tanstack/react-query';
import { getTraineeReqs } from '@/api/ratings';
import md5 from 'md5';

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

const nav_bar = (color: string) => {
  const navigate = useNavigate();
  return (
    <div className={`hidden px-6 md:flex lg:flex ${color}`}>
      <Button
        className={`rounded-full font-normal`}
        onClick={() => navigate('/create')}
      >
        Dar aulas
      </Button>

      <Button
        className="font-normal hover:bg-transparent"
        onClick={() => navigate('/signup')}
        variant="ghost"
      >
        Seja aluno
      </Button>
      <Button
        variant="ghost"
        className={`font-normal hover:bg-transparent ${color}`}
        onClick={() => navigate('/login')}
      >
        Login
      </Button>
    </div>
  );
};

const logged_nav_bar_client = (
  client: Client,
  isEditPage: boolean,
  color: string
) => {
  const navigate = useNavigate();
  const updateClient = useAppStore((state) => state.updateClient);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [md5F, setMd5F] = React.useState('');

  const textColor =
    isEditPage
      ? 'text-secondary'
      : 'text-secondary-foreground';

  const handleSignOut = () => {
    navigate('/search');
    updateClient(initialClient);
  };

  const { data, isSuccess } = useQuery({
    queryKey: [],
    queryFn: () => getTraineeReqs(client.id),
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (isSuccess && data?.length > 0) {
      const newMd5 = md5(JSON.stringify(data));
      setMd5F(newMd5);
      if (newMd5 !== client.md5Not) {
        updateClient({
          ...client,
          sawNot: false,
          md5Not: md5F,
        });
      }
    }
  }, [isSuccess, data]);

  return (
    <div
      className={`hidden gap-7 pl-6 md:flex md:items-center md:justify-center lg:flex ${color}`}
    >
      <div className="relative">
        <div
          className="relative cursor-pointer"
          onClick={() => {
            setShowDropdown(!showDropdown);
            if (!client.sawNot) {
              updateClient({
                ...client,
                sawNot: true,
                md5Not: md5F,
              });
            }
          }}
        >
          {isSuccess && data?.length > 0 && !client.sawNot && (
            <div className="absolute -right-2 -top-2 flex h-3 w-3 items-center justify-center rounded-full bg-primary">
              <span className="text-[8px] font-bold">{data.length}</span>
            </div>
          )}
          <Bell size={20} className="cursor-pointer" />
        </div>
        {showDropdown && (
          <div className="absolute -right-4 top-6 z-10 mt-1 w-60 rounded-lg border bg-white shadow-lg">
            <div
              className="cursor-pointer rounded-md bg-background shadow-md hover:bg-gray-100"
              onClick={() => navigate('/profile?tab=invites')}
            >
              <div className="flex flex-col gap-2 p-3">
                <p className="text-sm">
                  Você tem {data?.length} novas solicitações de avaliação
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex cursor-pointer items-center justify-center gap-3 rounded-lg px-3 py-1 hover:bg-black/20">
            {
              <AvatarProfileImg
                src={client.avatar}
                alt={client.full_name}
                size={32}
              />
            }
            <div className="flex flex-col items-start">
              <p className="text-sm">{client.full_name}</p>
              <p className="text-xs">{client.email}</p>
            </div>
            <ChevronDown size={16} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-sm bg-background" align="end">
          <DropdownMenuItem onClick={() => navigate('/profile')}>
            <UserIcon size={16} />
            <span className="ml-2">Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut size={16} />
            <span className="ml-2">Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const logged_nav_bar_personal = (
  page: Page,
  user: User,
  isEditPage: boolean,
  color: string
) => {
  const navigate = useNavigate();
  const updateUser = useAppStore((state) => state.updateUser);
  const updatePage = useAppStore((state) => state.updatePage);
  const textColor =
    isEditPage
      ? 'text-secondary'
      : 'text-secondary-foreground';

  const handleSignOut = () => {
    navigate('/search');
    updateUser(initialUser);
    updatePage(initialPage);
  };

  return (
    <div
      className={`hidden gap-7 pl-6 md:flex md:items-center md:justify-center lg:flex ${color}`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex cursor-pointer items-center justify-center gap-3 rounded-lg px-3 py-1 hover:bg-black/20">
            <AvatarProfileImg
              src={page.avatar}
              alt={page.page_name}
              size={32}
            />
            <div className="flex flex-col items-start">
              <p className="text-sm">{page.page_name}</p>
              <p className="text-xs">{user.email}</p>
            </div>
            <ChevronDown size={16} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-sm bg-background" align="end">
          <DropdownMenuItem onClick={() => navigate('/u/' + page.url)}>
            <Eye size={16} />
            <span className="ml-2">Ver perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/page/edit/form')}>
            <Settings size={16} />
            <span className="ml-2">Perfil </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut size={16} />
            <span className="ml-2">Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const Header = ({ bgColorPP }: { bgColorPP?: string }) => {
  if (!bgColorPP) {
    bgColorPP = '';
  }
  const user = useAppStore((state) => state.user);
  const client = useAppStore((state) => state.client);
  const page = useAppStore((state) => state.page);
  const navigate = useNavigate();
  const [isEditPage, _] = React.useState(
    window.location.pathname.includes('/page/edit') ||
    window.location.pathname.includes('/search') ||
    window.location.pathname.includes('/profile') ||
    window.location.pathname.includes('/')
  );

  return (
    <header className="relative z-50 flex items-center justify-between pb-20 pt-8">
      <div className="cursor-pointer" onClick={() => navigate('/search')}>
        <h1
          className={`text-4xl font-bold text-primary ${bgColorPP} `}
        >
          Personal<span className="font-light italic">tech</span>
        </h1>
      </div>
      {user.id
        ? logged_nav_bar_personal(page, user, isEditPage, bgColorPP)
        : client.id
          ? logged_nav_bar_client(client, isEditPage, bgColorPP)
          : nav_bar(bgColorPP)}
    </header>
  );
};
