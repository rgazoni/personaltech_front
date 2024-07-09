import { Layout } from '@/components/common/layout';
import { Sidebar } from './side-bar';
import { PropsWithChildren } from 'react';

export const PersonalEditionPage = ({ children }: PropsWithChildren) => {
  return (
    <Layout>
      <div className="flex gap-12 justify-between relative">
        <Sidebar />
        {children}
      </div>
    </Layout>
  );
};
