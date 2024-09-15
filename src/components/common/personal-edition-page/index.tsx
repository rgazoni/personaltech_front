import { Layout } from '@/components/common/layout';
import { Sidebar } from './side-bar';
import { PropsWithChildren } from 'react';
import { User } from '@/store';

export const PersonalEditionPage = ({ children, data }: PropsWithChildren<{
  data: User
}>) => {
  return (
    <Layout className='min-h-screen flex flex-col'>
      <div className="flex gap-12 justify-between relative grow">
        <Sidebar data={data} />
        {children}
      </div>
    </Layout>
  );
};
