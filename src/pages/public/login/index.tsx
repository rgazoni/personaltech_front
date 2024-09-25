import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/common/modal';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/user';
import useAppStore, { Client } from '@/store';
import { useNavigate } from 'react-router-dom';
import { loginChat } from '@/pages/private/message';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast.hook';

export const Login = () => {
  const updateUser = useAppStore((state) => state.updateUser);
  const updatePage = useAppStore((state) => state.updatePage);
  const updateClient = useAppStore((state) => state.updateClient);
  const navigate = useNavigate();
  const [loader, setLoader] = React.useState(false);
  const { notify } = useToast();

  const mutation = useMutation({
    mutationFn: (formData: {
      email: string;
      password: string;
      type: string;
    }) => login(formData.email, formData.password, formData.type),
    mutationKey: ['login'],
    onSuccess: async (data) => {
      if (data.role === 'trainee') {
        updateClient(data as Client);
        await loginChat((data as Client).uid_chat);
        navigate('/search');
        return;
      }
      // Ensure data is of type LoginResponse before accessing properties
      if ('user' in data && 'page' in data) {
        updateUser(data.user);
        updatePage(data.page);
        if (data.user.uid_chat !== '' && data.user.uid_chat !== null) {
          await loginChat(data.user.uid_chat);
        }
        navigate('/u/' + data.page.url);
      }
    },
    onError: (error) => {
      setLoader(false);
      notify('error', 'Login ou senha incorretos');
      console.error(error);
    },
  });

  return (
    <Modal>
      <h1 className="hidden md:lg:text-secondary md:lg:text-3xl md:lg:font-bold md:lg:block">
        Login
      </h1>
      <p className="mb-5 hidden pt-2 md:lg:text-start md:lg:text-muted md:lg:block">
        Insira seu e-mail e senha
      </p>
      <Tabs defaultValue="personal">
        <TabsList className="mb-5 grid w-full grid-cols-2 bg-primary text-white">
          <TabsTrigger value="personal">Treinador</TabsTrigger>
          <TabsTrigger value="trainee">Usuário</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const formValues = {
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                type: 'personal',
              };
              mutation.mutate(formValues);
            }}
          >
            <Input
              type="email"
              name="email"
              placeholder="E-mail"
              className="mt-6 py-6"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="mt-6 py-6"
            />
            <div className="flex w-full flex-col">
              <Button
                className="mx-auto mt-10 w-4/6 rounded-full py-6"
                type="submit"
                onClick={() => setLoader(true)}
              >
                {loader ? 'Carregando...' : 'Log in'}
              </Button>
              <Button className="mx-auto mt-1 py-2" variant="link">
                <span className="font-light text-blue-400 underline">
                  Esqueci minha senha
                </span>
              </Button>
            </div>
          </form>
        </TabsContent>
        <TabsContent value="trainee">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const formValues = {
                email: formData.get('email') as string,
                password: formData.get('password') as string,
                type: 'trainee',
              };
              mutation.mutate(formValues);
            }}
          >
            <Input
              type="email"
              name="email"
              placeholder="E-mail"
              className="mt-6 py-6"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="mt-6 py-6"
            />
            <div className="flex w-full flex-col">
              <Button
                className="mx-auto mt-10 w-4/6 rounded-full py-6"
                type="submit"
                onClick={() => setLoader(true)}
              >
                {loader ? 'Carregando...' : 'Log in'}
              </Button>
              <Button className="mx-auto mt-1 py-2" variant="link">
                <span className="font-light text-blue-400 underline">
                  Esqueci minha senha
                </span>
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </Modal>
  );
};
