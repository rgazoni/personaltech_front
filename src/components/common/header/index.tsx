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
  CirclePlay,
  Eye,
  LogOut,
  MessageCircle,
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
import { useQuery } from '@tanstack/react-query';
import { getUnreadMessageCount, logoutChat } from '@/pages/private/message';
import { getNotifications } from '@/api/notifications';
import { Notifications } from './notifications';

const nav_bar = (color: string) => {
  const navigate = useNavigate();
  return (
    <div className={`hidden px-6 md:flex lg:flex ${color}`}>
      <div className='flex items-center justify-center px-5'>
        <p
          className={`cursor-pointer text-sm font-light ${color}`}
          onClick={() => navigate('/')}
        >Sobre</p>
      </div>
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

const logged_nav_bar_client = (client: Client, color: string) => {
  const navigate = useNavigate();
  const updateClient = useAppStore((state) => state.updateClient);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [counterMessage, setCounterMessage] = React.useState(0);
  const [hasNotifications, setHasNotifications] = React.useState(false);

  const handleSignOut = async () => {
    navigate('/');
    updateClient(initialClient);

    await logoutChat();
  };

  const handleMessages = () => {
    navigate('/message');
  };

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const msg = await getUnreadMessageCount();
        setCounterMessage(msg);
      } catch (error) {
        console.log("Error fetching unread messages:", error);
      }
    };

    // Fetch unread messages on component mount
    fetchUnreadMessages();

    // Optionally set up an interval to refresh cache periodically
    const intervalId = setInterval(fetchUnreadMessages, 60000); // Update every minute

    return () => clearInterval(intervalId); // Clean up on unmount

  }, []);

  const { data: notifications, isSuccess: successNotifications } = useQuery({
    queryKey: ['notifications', client.id],
    queryFn: () => getNotifications(client.id),
  });

  useEffect(() => {
    if (successNotifications && notifications?.length > 0) {
      const unreaden_notifications = notifications.filter((n) => !n.read);
      setHasNotifications(unreaden_notifications.length > 0);
    }
  }, [successNotifications, notifications]);

  return (
    <div
      className={`hidden gap-7 pl-6 md:flex md:items-center md:justify-center lg:flex ${color}`}
    >
      <div className="flex items-center justify-center gap-6">
        <div className='relative'>
          <MessageCircle
            size={20}
            className={`cursor-pointer ${color}`}
            strokeWidth={2}
            onClick={handleMessages}
          />
          {counterMessage > 0 && (
            <div className="absolute -right-2 -top-2 flex h-3 w-3 items-center justify-center rounded-full bg-primary">
              <span className="text-[8px] font-bold">{counterMessage}</span>
            </div>
          )}

        </div>

        <div className="relative" onClick={() => setHasNotifications(false)}>
          <div
            className="relative cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {successNotifications && notifications?.length > 0 && hasNotifications && (
              <div className="absolute -right-1 -top-1 flex h-2 w-2 items-center justify-center rounded-full bg-primary"></div>
            )}
            <Bell size={20} className="cursor-pointer" />
          </div>
          {successNotifications && notifications?.length > 0 && (
            <Notifications data={notifications!} showDropdown={showDropdown} />
          )}
        </div>
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
    </div >
  );
};

const logged_nav_bar_personal = (page: Page, user: User, color: string) => {
  const navigate = useNavigate();
  const updateUser = useAppStore((state) => state.updateUser);
  const updatePage = useAppStore((state) => state.updatePage);
  const [counterMessage, setCounterMessage] = React.useState(0);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [hasNotifications, setHasNotifications] = React.useState(false);

  const handleSignOut = async () => {
    updateUser(initialUser);

    navigate('/');
    await logoutChat();

    updatePage(initialPage);
  };

  const handleMessages = () => {
    navigate('/message');
  };

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const msg = await getUnreadMessageCount();
        setCounterMessage(msg);
      } catch (error) {
        console.log("Error fetching unread messages:", error);
      }
    };

    // Fetch unread messages on component mount
    fetchUnreadMessages();

    // Optionally set up an interval to refresh cache periodically
    const intervalId = setInterval(fetchUnreadMessages, 60000); // Update every minute

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  const { data: notifications, isSuccess: successNotifications } = useQuery({
    queryKey: ['notifications', user.id],
    queryFn: () => getNotifications(user.id),
  });

  useEffect(() => {
    if (successNotifications && notifications?.length > 0) {
      const unreaden_notifications = notifications.filter((n) => !n.read);
      setHasNotifications(unreaden_notifications.length > 0);
    }
  }, [successNotifications, notifications]);

  const handlePlayClass = () => navigate('/play');

  return (
    <div
      className={`hidden gap-6 pl-6 md:flex md:items-center md:justify-center lg:flex ${color}`}
    >
      {page.is_published && (
        <>
          <CirclePlay size={20} className={`cursor-pointer ${color}`} strokeWidth={2} onClick={handlePlayClass} />
          <div className='relative'>
            <MessageCircle
              size={20}
              className={`cursor-pointer ${color}`}
              strokeWidth={2}
              onClick={handleMessages}
            />

            {counterMessage > 0 && (
              <div className="absolute -right-2 -top-2 flex h-3 w-3 items-center justify-center rounded-full bg-primary">
                <span className="text-[8px] font-bold">{counterMessage}</span>
              </div>
            )}
          </div>
        </>
      )}
      <div className="relative" onClick={() => setHasNotifications(false)}>
        <div
          className="relative cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {successNotifications && notifications?.length > 0 && hasNotifications && (
            <div className="absolute -right-1 -top-1 flex h-2 w-2 items-center justify-center rounded-full bg-primary"></div>
          )}
          <Bell size={20} className="cursor-pointer" />
        </div>
        {successNotifications && notifications?.length > 0 && (
          <Notifications data={notifications!} showDropdown={showDropdown} />
        )}
      </div>

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

  return (
    <header className="relative z-10 flex items-center justify-between pb-20 pt-8">
      <div className="cursor-pointer" onClick={() => navigate('/search')}>
        <h1 className={`text-4xl font-bold text-primary ${bgColorPP} `}>
          Personal<span className="font-light italic">tech</span>
        </h1>
      </div>
      <div className='flex items-center'>
        {user.id
          ? logged_nav_bar_personal(page, user, bgColorPP)
          : client.id
            ? logged_nav_bar_client(client, bgColorPP)
            : nav_bar(bgColorPP)}
      </div>
    </header>
  );
};
