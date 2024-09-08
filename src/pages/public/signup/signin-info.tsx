import { getCitiesByState, getStates } from '@/api/generic';
import { LabeledInput } from '@/components/common/labeled-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { isValidEmail } from '@/lib/helpers';
import { useProgressContext } from '@/providers/signup-provider';
import { initialState, passwordReducer } from '@/reducers/signup-validation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useReducer, useState } from 'react';

export const SigninInfo = () => {
  const [email, setEmail] = useState<boolean>(true);
  // @reducers/password-validation-signup
  const [{ len, equals }, dispatch] = useReducer(passwordReducer, initialState);
  // @context
  const { dispatch: progressDispatch, state } = useProgressContext();

  // State and city related
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [gender, setGender] = useState('');

  // Fetch all states using useQuery
  const { data: states, isLoading: loadingStates } = useQuery({
    queryKey: ['states'],
    queryFn: getStates,
  });

  useEffect(() => {
    if (selectedState) {
      const st = states.find((state: any) => state.sigla === selectedState);
      getCitiesByState(
        Number(st.id)).then((cities) => {
          setCities(cities);
          setSelectedCity(''); // Reset city selection when state changes
        });
    }
  }, [selectedState]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary">Cadastro</h1>
      <form
        className="mt-7 flex flex-col gap-4"
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const obj = {
            email: formData.get('email') as string,
            birthdate: formData.get('birthdate') as string,
            password: formData.get('password') as string,
            state: selectedState,
            city: selectedCity,
            gender,
          };
          if (!isValidEmail(obj.email)) {
            setEmail(false);
            return;
          }

          progressDispatch({ type: 'update-user', payload: { user: obj } });
          progressDispatch({ type: 'next' });
        }}
      >
        <div>
          <LabeledInput
            id="email"
            label="E-mail"
            type="text"
            name="email"
            defaultValue={state.user.email}
          />
          {!email && (
            <p className="pt-0.5 text-xs font-light text-destructive">
              Seu e-mail deve ser válido
            </p>
          )}
        </div>
        <LabeledInput
          id="birthdate"
          label="Data de Nascimento`"
          type="date"
          name="birthdate"
        />
        <Label className="font-light">Sexo</Label>
        <RadioGroup className='flex gap-10' onValueChange={(value) => setGender(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="M" id="M" />
            <Label htmlFor="M" className='font-light'>Masculino</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="F" id="F" />
            <Label htmlFor="F" className='font-light'>Feminino</Label>
          </div>
        </RadioGroup>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <Label htmlFor="state" className="font-light">
              Estado
            </Label>
            <Select
              value={selectedState}
              onValueChange={(value) => {
                setSelectedState(value); // Make sure the selected state is correctly updated
              }}
              disabled={loadingStates} // Correctly disable if states are still loading
            >
              <SelectTrigger className="mt-1 w-full text-start">
                <div className="text-sm">
                  <SelectValue
                    placeholder={
                      loadingStates ? 'Carregando estados...' : 'Selecione um estado'
                    }
                  />
                </div>
              </SelectTrigger>
              <SelectContent>
                {states &&
                  states.map((state: any) => (
                    <SelectItem key={state.sigla} value={state.sigla}>
                      {state.sigla}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="city" className="font-light">
              Cidade
            </Label>
            <Select
              value={selectedCity}
              onValueChange={(value) => setSelectedCity(value)}
              disabled={!selectedState || cities.length === 0}
            >
              <SelectTrigger className="mt-1 w-full py-2 border rounded-md px-4 text-start flex justify-between items-center">
                <div className="text-sm">
                  <SelectValue
                    placeholder={
                      selectedState
                        ? 'Selecione uma cidade'
                        : 'Selecione um estado primeiro'
                    }
                  />
                </div>
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.nome}>
                    {city.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='grid-cols-2 grid gap-3'>
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
            className="mx-auto mt-10 w-4/6 rounded-full py-6"
            type="submit"
            disabled={!len || !equals}
          >
            Avançar
          </Button>
        </div>
      </form>
    </div>
  );
};
