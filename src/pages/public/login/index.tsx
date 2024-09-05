import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/common/modal';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/user';
import useAppStore, { Client } from '@/store';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const updateUser = useAppStore((state) => state.updateUser);
  const updatePage = useAppStore((state) => state.updatePage);
  const updateClient = useAppStore((state) => state.updateClient);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData: { email: string, password: string }) => login(formData.email, formData.password),
    mutationKey: ['login'],
    onSuccess: (data) => {
      if (data.role === 'client') {
        console.log('asdads')
        console.log(data)
        updateClient(data as Client);
        navigate('/search');
        return
      }

      // Ensure data is of type LoginResponse before accessing properties
      if ('user' in data && 'page' in data) {
        updateUser(data.user);
        updatePage(data.page);
        navigate('/u/' + data.page.url);
      }
    },
    onError: (error) => {
      console.error(error);
    }
  });

  return (
    <Modal>
      <h1 className="md:lg:font-bold md:lg:text-3xl md:lg:text-secondary hidden md:lg:block">Login</h1>
      <p className="md:lg:text-muted md:lg:pt-3 md:lg:text-start hidden md:lg:block">Insira seu e-mail e senha</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const formValues = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
          };
          mutation.mutate(formValues);
        }}
      >
        <Input type="email" name="email" placeholder="E-mail" className="mt-6 py-6" />
        <Input type="password" name="password" placeholder="Password" className="mt-6 py-6" />
        <div className="w-full flex flex-col">
          <Button className="mt-10 py-6 mx-auto w-4/6 rounded-full" type="submit">Log in</Button>
        </div>
      </form>
      <Button className="mt-1 py-2 mx-auto" variant="link">
        <span className="text-blue-400 underline font-light">Esqueci minha senha</span>
      </Button>
    </Modal>
  );
}

