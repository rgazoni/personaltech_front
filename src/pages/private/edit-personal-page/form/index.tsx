import { ColorOpts } from './color-opts';
import { CrefVerification } from './cref/cref-verification';
import { PersonalData } from './personal-data';
import { UserImage } from '@/components/common/user-image';
import { useEditPersonalContext } from '@/providers/edit-personal-page-provider';

export const PersonalFormPage = () => {
  const { state, dispatch } = useEditPersonalContext();
  const info = {
    backgroundColor: state.background_color || '#272727',
  }

  const handleColorChange = (color: string) => {
    dispatch({ type: 'update-background_color', payload: { background_color: color } });
  }

  return (
    <>
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
            src=""
            height="12"
            width="12"
          />
          <ColorOpts onColorChange={handleColorChange}>
            <div className='flex gap-2 items-center'>
              <div className='rounded-full h-6 w-6' style={{ background: info.backgroundColor }}></div>
              <p className='font-light text-muted-foreground text-sm'>Cor do seu perfil</p>
            </div>
          </ColorOpts>
        </div>
      </div>
    </>
  );
};
