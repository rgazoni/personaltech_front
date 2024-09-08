import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/common/modal';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/user';
import useAppStore, { Client } from '@/store';
import { useNavigate } from 'react-router-dom';
import { loginChat } from '@/pages/private/message';
import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export const Login = () => {
  const updateUser = useAppStore((state) => state.updateUser);
  const updatePage = useAppStore((state) => state.updatePage);
  const updateClient = useAppStore((state) => state.updateClient);
  const navigate = useNavigate();
  const [loader, setLoader] = React.useState(false);

  const mutation = useMutation({
    mutationFn: (formData: { email: string, password: string, type: "trainee" | "personal" }) => login(formData.email, formData.password, formData.type),
    mutationKey: ['login'],
    onSuccess: async (data) => {
      if (data.role === 'trainee') {
        updateClient(data as Client);
        await loginChat((data as Client).uid_chat);
        navigate('/search');
        return
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
      console.error(error);
    }
  });

  return (
    <Modal>
      <h1 className="md:lg:font-bold md:lg:text-3xl md:lg:text-secondary hidden md:lg:block">Login</h1>
      <p className="md:lg:text-muted md:lg:text-start hidden md:lg:block mb-5 pt-2">Insira seu e-mail e senha</p>
      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-2 mb-5 bg-primary text-white">
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
                type: "personal",
              };
              mutation.mutate(formValues);
            }}
          >
            <Input type="email" name="email" placeholder="E-mail" className="mt-6 py-6" />
            <Input type="password" name="password" placeholder="Password" className="mt-6 py-6" />
            <div className="w-full flex flex-col">
              <Button className="mt-10 py-6 mx-auto w-4/6 rounded-full" type="submit" onClick={() => setLoader(true)}>
                {loader ? 'Carregando...' : 'Log in'}
              </Button>
              <Button className="mt-1 py-2 mx-auto" variant="link">
                <span className="text-blue-400 underline font-light">Esqueci minha senha</span>
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
            <Input type="email" name="email" placeholder="E-mail" className="mt-6 py-6" />
            <Input type="password" name="password" placeholder="Password" className="mt-6 py-6" />
            <div className="w-full flex flex-col">
              <Button className="mt-10 py-6 mx-auto w-4/6 rounded-full" type="submit" onClick={() => setLoader(true)}>
                {loader ? 'Carregando...' : 'Log in'}
              </Button>
              <Button className="mt-1 py-2 mx-auto" variant="link">
                <span className="text-blue-400 underline font-light">Esqueci minha senha</span>
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </Modal>
  );
}

