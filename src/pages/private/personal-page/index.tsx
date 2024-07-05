import { Layout } from '@/components/common/layout';
import { UserImage } from '@/components/common/user-image';
import { BadgeExpertise } from './badge-expertise';
import { Star } from 'lucide-react';

export const PersonalPage = () => {
  return (
    <div className="relative">
      <Layout>
        <div
          className="absolute left-0 top-0 z-0 h-[26rem] w-full"
          style={{ background: '#692A42' }}
        ></div>
        <div className="relative z-10 flex gap-14">
          {/* Left column  */}
          <div>
            <UserImage
              src="https://images.unsplash.com/photo-1605050824853-7fb0755face3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              height="24"
              width="24"
              borderRadius="0.75"
            />
          </div>

          {/* Right column  */}
          <div className='grow'>
            <div className="flex gap-2">
              <div className="mt-14 flex flex-col gap-5">
                <h1 className="text-5xl font-bold text-white">Felipe Pallardi</h1>
                <BadgeExpertise expertise="Ciclismo" />
                <div>
                  <h2 className="text-bg font-light text-white">São Paulo, Brasil</h2>
                  <h2 className="text-bg font-light text-white mt-1">CREF 01O586-Y/MG</h2>
                </div>
              </div>
              <div className='flex flex-grow justify-end mt-10 gap-0.5 mr-4'>
                <Star size={24} fill='#FFC728' strokeWidth={0} />
                <Star size={24} fill='#FFC728' strokeWidth={0} />
                <Star size={24} fill='#FFC728' strokeWidth={0} />
                <Star size={24} fill='#FFC728' strokeWidth={0} />
                <Star size={24} fill='#FFC728' strokeWidth={0} />
                <Star size={24} fill='#FFC728' strokeWidth={0} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
