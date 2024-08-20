import { Layout } from '@/components/common/layout';
import { Button } from '@/components/ui/button';
import { ProfilePersonalCard } from './profile-personal-card';

export const Search = () => {


  return (
    <div className="relative w-full">
      <Layout>
        <div className='mx-auto flex flex-col gap-8 w-fit'>
          <h1 className='text-center text-6xl font-bold text-secondary text-nowrap'>Encontre seu treinador</h1>
          <div className='rounded-full bg-tertiary-foreground border border-primary relative'>
            <input type='text' placeholder='Qual modalidade você está buscando?'
              className='w-full h-12 pl-4 rounded-full bg-tertiary-foreground focus:outline-none'
            />
            <Button className='absolute right-1 top-1 w-32 bg-primary rounded-full'>
              Buscar
            </Button>
          </div>
        </div>

        <div className='flex flex-col gap-8 mt-24'>
          <ProfilePersonalCard />
          <ProfilePersonalCard />
          <ProfilePersonalCard />
        </div>
      </Layout>
    </div>
  );
};
