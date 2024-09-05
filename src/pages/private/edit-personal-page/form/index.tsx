import { UserEditImage } from '@/components/common/user-edit-image';
import { ColorOpts } from './color-opts';
import { CrefVerification } from './cref/cref-verification';
import { PersonalData } from './personal-data';
import { useEditPersonalContext } from '@/providers/edit-personal-page-provider';
import useAppStore from '@/store';
import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '@/api/user';

export const PersonalFormPage = () => {
  const { state, dispatch } = useEditPersonalContext();
  const user = useAppStore((state) => state.user);
  const info = {
    backgroundColor: state.background_color || '#272727',
  };

  const handleColorChange = (color: string) => {
    dispatch({
      type: 'update-background_color',
      payload: { background_color: color },
    });
  };

  const { data } = useQuery({
    queryKey: ['user-info', user.token],
    queryFn: () => fetchUserInfo(user.token),
  })

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
          {data && <PersonalData user={data} />}
        </div>
        <div className="flex flex-col items-center gap-6">
          <UserEditImage src={state.avatar} height="12" width="12" />
          <ColorOpts onColorChange={handleColorChange}>
            <div className="flex items-center gap-2">
              <div
                className="h-6 w-6 rounded-full"
                style={{ background: info.backgroundColor }}
              ></div>
              <p className="text-sm font-light text-muted-foreground">
                Cor do seu perfil
              </p>
            </div>
          </ColorOpts>
        </div>
      </div>
    </>
  );
};
