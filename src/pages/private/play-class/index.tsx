import { LabeledInput } from '@/components/common/labeled-input';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchTrainees } from '@/api/user';
import { X } from 'lucide-react';
import useAppStore, { Client } from '@/store';
import { AvatarProfileImg } from '@/components/common/avatar-profile-img';
import { useToast } from '@/hooks/use-toast.hook';
import { Layout } from '@/components/common/layout';
import { Classes, PersonalClasses, createClass, deleteClass, getPersonalClasses, getTraineeResponses, updateClass } from '@/api/classes';
import { Button } from '@/components/ui/button';

const Loader = () => (
  <div className="flex items-center justify-center py-10">
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-400"></div>
    <p className="ml-4 text-sm text-muted">Carregando...</p>
  </div>
);

export const PlayClass = () => {
  const [traineeInvite, setTraineeInvite] = useState('');
  const [searchResults, setSearchResults] = useState<Client[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { notify } = useToast();
  const user = useAppStore((state) => state.user);

  const [pendingReqs, setPendingReqs] = useState<PersonalClasses[]>([]);

  // New States for Class Timing
  const [classStarted, setClassStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);

  const handleFetchTrainee = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTraineeInvite(value);

    if (value.length < 3) {
      setShowDropdown(true);
      setSearchResults([]);
      return;
    }

    console.log('Sending invite to', value);
    mutateTrainees.mutate(value);
  };

  const handleSelectTrainee = (id: string) => {
    console.log('Selected', id);
    setShowDropdown(false);
    setTraineeInvite('');
    mutateClass.mutate({ trainee_id: id, personal_id: user.id });
    notify('info', 'Enviando convite... 📧');
  };

  const { data, isPending, isSuccess, refetch, isRefetching } = useQuery({
    queryKey: ['personalReqs', user.id],
    queryFn: () => getPersonalClasses(user.id),
  });

  const mutateTrainees = useMutation({
    mutationFn: fetchTrainees,
    mutationKey: ['fetchClients', traineeInvite],
    onSuccess: (data) => {
      setShowDropdown(true);
      setSearchResults(data || []);
    },
  });

  const mutateClass = useMutation({
    mutationFn: createClass,
    mutationKey: ['createClass', traineeInvite],
    onSuccess: (data) => {
      if (typeof data === 'string') {
        notify('info', data);
        return;
      }
      notify('success', 'Convite enviado com sucesso ✉️');
      refetch();
    },
    onError: (error) => {
      console.error('Error sending invite', error);
      notify('error', 'Erro ao enviar convite. Tente novamente mais tarde.');
    },
  });

  const mutateDeleteInvite = useMutation({
    mutationFn: deleteClass,
    mutationKey: ['deleteClass'],
    onSuccess: (data) => {
      notify('success', 'Convite deletado com sucesso ✉️');
      if ((data as Classes).trainee_id !== undefined)
        setPendingReqs(
          pendingReqs.filter((r) => r.id !== (data as Classes).trainee_id)
        );
    },
    onError: (error) => {
      notify('error', 'Não foi possível deletar o convite. Tente novamente.');
      console.error('Error deleting invite', error);
    },
  });

  useEffect(() => {
    if (data) setPendingReqs(data);
  }, [data]);

  const { data: traineeResponses, refetch: refetchResponses } = useQuery({
    queryKey: ['traineeResponses'],
    queryFn: () => getTraineeResponses(user.id, 'accepted'),
  });

  // Function to start the class
  const handleStartClass = () => {
    setClassStarted(true);
    const start = Date.now();
    setStartTime(start);
    notify('info', 'Aula iniciada! 🚀');
  };

  // Function to end the class and calculate elapsed time
  const handleEndClass = () => {
    if (startTime) {
      const endTime = Date.now();
      const elapsed = Math.floor((endTime - startTime) / 1000); // Elapsed time in seconds
      setElapsedTime(elapsed);
      setClassStarted(false);
      setStartTime(null);
      notify('success', 'Aula finalizada! 🛑');
    }
  };

  const mutateFinishClass = useMutation({
    mutationFn: updateClass,
    mutationKey: ['updateClass', user.id],
    onSuccess: (data) => {
      console.log('Class finished', data);
      refetchResponses();
    },
    onError: (error) => {
      console.error('Error deleting invite', error);
    },
  });


  const handleFinishClass = (class_id: string) => {
    mutateFinishClass.mutate({
      id: class_id,
      status: 'finished',
    })
  }

  // Helper function to format elapsed time
  const formatElapsedTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins}m ${secs}s`;
  };

  return (
    <Layout>
      <div className="flex w-full gap-16 px-32">
        <div className="mb-10 flex w-full flex-col gap-10">
          <div>
            <h2 className="pb-2 text-4xl font-bold text-secondary">
              Comece sua aula!
            </h2>
            <p className="font-light text-muted">
              Aqui você vai poder começar a aula com um aluno e posteriormente ele vai poder avaliá-lo. Esta é a única maneira para que o aluno te avalie. Nós prezamos pela qualidade do ensino e por isso, só permitimos avaliações de alunos que já tiveram aula com você.
            </p>
          </div>

          {traineeResponses && traineeResponses.length > 0 && (
            <div>
              <h1 className="pb-5 text-sm font-light">
                Seu aluno aceitou a aula, clique para começar!
              </h1>
              {traineeResponses.map((req) => (
                <div
                  key={req.id}
                  className="flex w-fit items-center gap-5 rounded-md border px-5 py-4"
                >
                  <AvatarProfileImg
                    src={req.avatar}
                    alt={req.page_name}
                    size={64}
                  />
                  <div>
                    {classStarted ? (
                      // If class is started, do not show timer
                      <div className='space-y-1'>
                        <h5 className="text-sm ">{req.full_name}</h5>
                        {/* No timer displayed */}
                      </div>
                    ) : (
                      <div className='space-y-1'>
                        <h5 className="text-sm ">{req.full_name}</h5>
                        {elapsedTime !== null && (
                          <p className="text-xs text-start w-full pb-1">
                            Tempo decorrido: {formatElapsedTime(elapsedTime)}
                          </p>
                        )}
                        {/* Show "Começar aula" button if class is not started */}
                        {elapsedTime === null ? (
                          <Button
                            className="text-xs"
                            variant="outline"
                            size="sm"
                            onClick={handleStartClass}
                          >
                            Começar aula
                          </Button>
                        ) : (
                          <Button
                            className="text-xs"
                            variant="destructive"
                            size="sm"
                            onClick={() => handleFinishClass(req.class_id)}
                          >
                            Finalizar aula
                          </Button>
                        )}
                      </div>
                    )}
                    {/* Show "Finalizar aula" button if class is started */}
                    {classStarted && (
                      <Button
                        className="text-xs mt-2"
                        variant="secondary"
                        size="sm"
                        onClick={handleEndClass}
                      >
                        Pausar aula
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-5 rounded-lg border px-12 pb-10 pt-6">
            <div>
              <h4 className="text-lg text-secondary">
                Quer começar uma aula?
              </h4>
              <p className="text-sm text-muted">
                Encontre o aluno que deseja convidar para a aula.
              </p>
            </div>
            <div className="relative">
              <LabeledInput
                label="Nome do Aluno"
                placeholder="Digite o nome do aluno..."
                onChange={handleFetchTrainee}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                type="text"
                value={traineeInvite}
                autoComplete="off"
              />
              {showDropdown && (
                <div className="absolute z-10 mt-1 w-full rounded-lg border bg-white shadow-lg">
                  {traineeInvite.length < 3 ? (
                    <p className="p-3 text-sm text-muted">
                      Digite pelo menos três letras para buscar...
                    </p>
                  ) : (
                    <ul>
                      {searchResults.length > 0 ? (
                        searchResults.map((result) => (
                          <li
                            key={result.id}
                            onClick={() => handleSelectTrainee(result.id)}
                            className="flex cursor-pointer items-center gap-3 p-3 hover:bg-gray-100"
                          >
                            <AvatarProfileImg
                              src={result.avatar}
                              alt={result.full_name}
                              size={32}
                            />
                            <span className="font-light">
                              {result.full_name}
                            </span>
                          </li>
                        ))
                      ) : (
                        <p className="p-3 text-sm text-muted">
                          Nenhum resultado encontrado
                        </p>
                      )}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>

          {(isPending || isRefetching) && <Loader />}
          {isSuccess && data && (
            <div>
              <h1 className="pb-5 text-sm font-light text-muted">
                Alunos convidados
              </h1>
              {pendingReqs.length === 0 ? (
                <div className="rounded-xl border py-5">
                  <p className="text-center text-xs text-muted">
                    Nenhum aluno convidado
                  </p>
                </div>
              ) : (
                pendingReqs.map((req) => (
                  <div
                    key={req.id}
                    className="flex w-fit items-center gap-2 rounded-full border bg-secondary-foreground px-2 py-1"
                  >
                    <AvatarProfileImg
                      src={req.avatar}
                      alt={req.full_name}
                      size={28}
                    />
                    <div>
                      <h5 className="text-xs text-secondary">
                        {req.full_name}
                      </h5>
                      <p className="text-xs text-muted">Convite enviado</p>
                    </div>
                    <X
                      size={16}
                      strokeWidth={2}
                      className="cursor-pointer text-muted-foreground"
                      onClick={() => {
                        mutateDeleteInvite.mutate({
                          class_id: req.class_id
                        });
                      }}
                    />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

