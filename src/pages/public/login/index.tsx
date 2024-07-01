import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/common/modal';
export const Login = () => {
  return (
    <Modal>
      <h1 className="md:lg:font-bold md:lg:text-3xl md:lg:text-secondary hidden md:lg:block">Login</h1>
      <p className="md:lg:text-muted md:lg:pt-3 md:lg:text-start hidden md:lg:block">Insira seu e-mail e senha</p>
      <form>
        <Input type="email" placeholder="E-mail" className="mt-6 py-6" />
        <Input type="password" placeholder="Password" className="mt-6 py-6" />
        <div className="w-full flex flex-col">
          <Button className="mt-10 py-6 mx-auto w-4/6 rounded-full">Log in</Button>
        </div>
      </form>
      <Button className="mt-1 py-2 mx-auto" variant="link">
        <span className="text-blue-400 underline font-light">Esqueci minha senha</span>
      </Button>
    </Modal>
  );
}
