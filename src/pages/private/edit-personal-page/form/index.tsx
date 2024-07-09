import { EditPersonalPageFormProvider } from '@/providers/edit-personal-page-form';
import { CrefVerification } from './cref/cref-verification';
import { PersonalData } from './personal-data';
import { UserImage } from '@/components/common/user-image';

export const PersonalFormPage = () => {
  return (
    <EditPersonalPageFormProvider>
      <div className="flex w-full gap-16">
        <div className="flex w-full flex-col gap-10">
          <CrefVerification />
          <div>
            <h2 className="pb-2 font-light text-muted">
              Para você poder publicar sua página, preencha os campos abaixo!
            </h2>
            <p className="text-xs font-light text-muted">
              Todos os asteríscos* são campos obrigatórios para que sua página
              seja publicada.
            </p>
          </div>
          <PersonalData />
        </div>
        <div className='flex-col gap-6 flex items-center'>
          <UserImage
            src="https://images.unsplash.com/photo-1605050824853-7fb0755face3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="12"
            width="12"
          />
          <div className='flex gap-2 items-center'>
            <div className='rounded-full h-6 w-6' style={{ background: '#8B435E' }}></div>
            <p className='font-light text-muted-foreground text-sm'>Cor do seu perfil</p>
          </div>
        </div>
      </div>
    </EditPersonalPageFormProvider>
  );
};
