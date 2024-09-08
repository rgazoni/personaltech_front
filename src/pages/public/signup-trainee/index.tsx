import { LabeledInput } from '@/components/common/labeled-input';
import { Button } from '@/components/ui/button';
import { isValidEmail } from '@/lib/helpers';
import { initialState, passwordReducer } from '@/reducers/signup-validation';
import React, { useEffect, useState } from 'react';
import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { Camera, ChevronLeft } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createTrainee } from '@/api/user';
import { useToast } from '@/hooks/use-toast.hook';
import useAppStore from '@/store';
import imageCompression from 'browser-image-compression';
import { loginChat } from '@/pages/private/message';
import { getCitiesByState, getStates } from '@/api/generic';

// @types
type ModalProps = {
  className?: string;
  children: React.ReactNode;
};

type UserImageProps = {
  src?: string;
  height: string;
  width: string;
  borderRadius?: string;
  onEdit: (avatar: File) => void;
};

// Default image URL
const DEFAULT_IMAGE_URL = '/src/assets/default-avatar.png';

export const UserEditImage = ({
  src = DEFAULT_IMAGE_URL,
  height,
  width,
  borderRadius = '0.75',
  onEdit,
}: UserImageProps) => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 600,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        setAvatar(compressedFile);
        onEdit(compressedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <div>
      <div
        className="container relative mx-auto overflow-hidden"
        style={{
          height: `${height}rem`,
          width: `${width}rem`,
          borderRadius: `${borderRadius}rem`,
        }}
      >
        {preview ? (
          <img
            src={preview as string}
            alt="User profile image"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <img
            src={src || DEFAULT_IMAGE_URL}
            alt="User profile image"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}
        <div
          className="absolute bottom-1 left-1 flex cursor-pointer items-center rounded-full bg-white p-1"
          onClick={handleClick}
        >
          <Camera size={16} />
        </div>
      </div>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export const Modal = ({ children, className }: ModalProps) => {
  const navigate = useNavigate();
  return (
    <div className={`flex h-screen flex-col items-center justify-center bg-gray-100 py-10 ${className}`}>
      <div className="circle modal-top-left absolute"></div>
      <div className="circle modal-bottom-right absolute"></div>

      <div className="relative z-50 flex h-full w-full flex-col items-center justify-center rounded-lg bg-white p-7 shadow-xl md:h-auto md:rounded-none md:bg-transparent md:p-0 md:shadow-none">
        <div
          className="absolute left-12 top-4 cursor-pointer rounded-full bg-white p-1 shadow-xl"
          onClick={() => navigate('/search')}
        >
          <ChevronLeft />
        </div>

        <div className="relative flex w-full max-w-2xl flex-col justify-center rounded-lg p-5 md:bg-white md:p-10 md:shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export const SignupTrainee = () => {
  const updateClient = useAppStore((state) => state.updateClient);
  const navigate = useNavigate();
  const { notify } = useToast();

  const [email, setEmail] = useState({ email: '', isValid: true });
  const [submit, setSubmit] = useState(false);
  const [{ len, equals }, dispatch] = useReducer(passwordReducer, initialState);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loader, setLoader] = useState(false);

  // State and city related
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState('');

  // Fetch all states using useQuery
  const { data: states, isLoading: loadingStates } = useQuery({
    queryKey: ['states'],
    queryFn: getStates,
  });

  useEffect(() => {
    if (selectedState) {
      getCitiesByState(Number(selectedState)).then((cities) => {
        setCities(cities);
        setSelectedCity(''); // Reset city selection when state changes
      });
    }
  }, [selectedState]);

  const mutate = useMutation({
    mutationFn: createTrainee,
    mutationKey: ['createClient'],
    onSuccess: async (data) => {
      notify('success', '🏋️ Usuário criado com sucesso!');
      updateClient(data);
      navigate('/search');
      await loginChat(data.uid_chat);
    },
    onError: (error) => {
      notify('error', 'Erro ao criar usuário');
      console.error(error);
      setLoader(false);
    },
  });

  return (
    <Modal>
      <div
        className="cursor-pointer p-1 text-center"
        onClick={() => navigate('/search')}
      >
        <h1 className="mb-2 text-4xl font-bold text-primary">
          Personal<span className="font-light italic">tech</span>
        </h1>
      </div>

      <h1 className="text-center text-xl font-bold text-secondary">
        Cadastro do Aluno
      </h1>
      <form
        className="mt-7 flex flex-col gap-4"
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          setLoader(true);
          const formData = new FormData(e.target as HTMLFormElement);
          const obj = {
            full_name: formData.get('fullname') as string,
            birthdate: formData.get('birthdate') as unknown as Date,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            avatar: avatar!,
            city: selectedCity,
            state: selectedState,
          };
          setSubmit(true);
          if (!email.isValid) {
            return;
          }
          mutate.mutate(obj);
        }}
      >
        <UserEditImage
          height="6"
          width="6"
          src=""
          onEdit={(avatar: File) => setAvatar(avatar)}
        />
        <LabeledInput
          id="fullname"
          label="Nome completo"
          type="text"
          name="fullname"
        />

        <div className="grid grid-cols-2 gap-5">
          <LabeledInput
            id="birthdate"
            label="Data de nascimento"
            type="date"
            name="birthdate"
          />

          <div>
            <LabeledInput
              id="email"
              label="E-mail"
              type="email"
              name="email"
              onChange={(e) =>
                setEmail({
                  email: e.target.value,
                  isValid: isValidEmail(e.target.value),
                })
              }
              defaultValue={email.email}
            />
            {!email.isValid && submit && (
              <p className="pt-0.5 text-xs font-light text-destructive">
                Seu e-mail deve ser válido
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="state" className="block text-sm font-medium">
              Estado
            </label>
            <select
              id="state"
              name="state"
              className="mt-1 block w-full"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              disabled={loadingStates}
            >
              <option value="" disabled>
                {loadingStates ? 'Carregando estados...' : 'Selecione um estado'}
              </option>
              {states &&
                states.map((state: any) => (
                  <option key={state.id} value={state.id}>
                    {state.sigla}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium">
              Cidade
            </label>
            <select
              id="city"
              name="city"
              className="mt-1 block w-full"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState || cities.length === 0}
            >
              <option value="" disabled>
                {selectedState ? 'Selecione uma cidade' : 'Selecione um estado primeiro'}
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <LabeledInput
            id="password"
            name="password"
            label="Senha"
            type="password"
            onChange={(e) =>
              dispatch({ type: 'password-length', payload: e.target.value })
            }
          />
          <LabeledInput
            id="confirm-password"
            name="confirm-password"
            label="Confirmar senha"
            type="password"
            onChange={(e) =>
              dispatch({ type: 'password-equals', payload: e.target.value })
            }
          />
        </div>

        <div className="mt-4 flex flex-col text-sm font-light text-tertiary">
          <div className="flex gap-2">
            <p>Senha deve conter no mínimo 8 caracteres</p>
            {len && <span>✅</span>}
          </div>
          <div className="flex gap-2">
            <p>Ambas as senhas devem ser iguais</p>
            {equals && <span>✅</span>}
          </div>
        </div>
        <div className="flex w-full flex-col">
          <Button
            className="mx-auto mt-4 w-full rounded-full py-6"
            type="submit"
            disabled={!len || !equals || !selectedCity || !selectedState}
          >
            {loader ? 'Carregando...' : 'Cadastrar'}
          </Button>
        </div>
      </form>
    </Modal >
  );
};

