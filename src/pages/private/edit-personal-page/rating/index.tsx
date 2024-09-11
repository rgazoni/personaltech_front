import { LabeledInput } from '@/components/common/labeled-input';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchTrainees } from '@/api/user';
import { Button } from '@/components/ui/button';
import { Star, Trash, X } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import useAppStore, { Client } from '@/store';
import { AvatarProfileImg } from '@/components/common/avatar-profile-img';
import { useToast } from '@/hooks/use-toast.hook';
import {
  PersonalReqs,
  Rating,
  RatingInfo,
  createInvite,
  deleteInvite,
  getPersonalReqs,
  getRatings,
  updateRequest,
} from '@/api/ratings';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { updateCommentsSort } from '@/api/page';

const Loader = () => (
  <div className="flex items-center justify-center py-10">
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-400"></div>
    <p className="ml-4 text-sm text-muted">Carregando...</p>
  </div>
);

const RatingCard = ({
  status = 'accepted',
  data,
  onSubmit,
  onDelete,
}: {
  status?: string;
  data: RatingInfo;
  onSubmit?: (id: string, type: string) => void;
  onDelete?: (id: string) => void;
}) => {
  const date = new Date(data.userResponseAt);
  const user = useAppStore((state) => state.user);

  const mutateDecision = useMutation({
    mutationFn: updateRequest,
    mutationKey: ['updateRating', data.trainee_id],
    onSuccess: (data) => {
      console.log('Updatasdfdsfed', data);
      if (onDelete) onDelete(data.trainee_id);
    },
    onError: (error) => {
      console.error('Error updating rating', error);
    },
  });

  const handleDelete = () => {
    mutateDecision.mutate({
      trainee_id: data.trainee_id,
      personal_id: user.id,
      request: 'rejected',
    });
  }

  return (
    <div className="rounded-lg border border-primary p-8 ease-in-out">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <AvatarProfileImg src={data.avatar} alt={data.full_name} size={48} />
          <div>
            <h6 className="text-lg text-secondary">{data.full_name}</h6>
            <div className="flex gap-1">
              {Array.from({ length: data.rating }, (_, index) => (
                <Star key={index} size={16} strokeWidth={0} fill="#FFC728" />
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-4 pt-1">
          <p className="h-fit text-sm font-light text-muted-foreground">
            {date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}
          </p>
          {status === 'accepted' && (
            <Trash
              size={16}
              strokeWidth={2}
              className="cursor-pointer text-muted-foreground"
              onClick={handleDelete}
            />
          )}
        </div>
      </div>
      <div className="mt-4 rounded-lg pl-16">
        <p className="text-sm text-muted-foreground">{data.comment}</p>
      </div>
      {status === 'pending' && (
        <div className="flex justify-end gap-4 pt-7">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => {
              mutateDecision.mutate({
                trainee_id: data.trainee_id,
                personal_id: user.id,
                request: 'rejected',
              })
              if (onSubmit) onSubmit(data.trainee_id, 'rejected');
            }}
          >
            Recusar
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => {
              mutateDecision.mutate({
                trainee_id: data.trainee_id,
                personal_id: user.id,
                request: 'accepted',
              })
              if (onSubmit) onSubmit(data.trainee_id, 'accepted');
            }}
          >
            Aceitar
          </Button>
        </div>
      )}
    </div>
  );
};

export const PersonalRatingPage = () => {
  const [traineeInvite, setTraineeInvite] = useState('');
  const [searchResults, setSearchResults] = useState<Client[]>([]); // Manage search results
  const [showDropdown, setShowDropdown] = useState(false); // Manage dropdown visibility
  const { notify } = useToast();
  const user = useAppStore((state) => state.user);
  const page = useAppStore((state) => state.page);
  const updatePageField = useAppStore((state) => state.updatePageField);
  const [pendingReqs, setPendingReqs] = useState<PersonalReqs[]>([]);

  const [accData, setAccData] = useState<RatingInfo[]>([]);
  const [pendData, setPendData] = useState<RatingInfo[]>([]);

  const [sortType, setSortType] = useState(page.comments_sort);

  const handleInviteTrainee = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTraineeInvite(value);

    if (value.length < 3) {
      setShowDropdown(true); // Show dropdown but indicate more characters are needed
      setSearchResults([]); // Clear previous results
      return;
    }

    console.log('Sending invite to', value);
    mutateRating.mutate(value);
  };

  const handleSelectTrainee = (id: string) => {
    console.log('Selected', id);
    setShowDropdown(false);
    setTraineeInvite(''); // Clear input
    mutateInvite.mutate({ trainee_id: id, personal_id: user.id });
    notify('info', 'Enviando convite... 📧');
  };

  const { data, isPending, isSuccess, refetch, isRefetching } = useQuery({
    queryKey: ['personalReqs', user.token],
    queryFn: () => getPersonalReqs(user.token),
  });

  const mutateRating = useMutation({
    mutationFn: fetchTrainees,
    mutationKey: ['fetchClients', traineeInvite],
    onSuccess: (data) => {
      setShowDropdown(true); // Show dropdown with results
      setSearchResults(data || []); // Populate search results
    },
  });

  //TODO send invite to trainee with mutation
  const mutateInvite = useMutation({
    mutationFn: createInvite,
    mutationKey: ['inviteTrainee', traineeInvite],
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
    mutationFn: deleteInvite,
    mutationKey: ['deleteInvite'],
    onSuccess: (data) => {
      notify('success', 'Convite deletado com sucesso ✉️');
      if ((data as Rating).trainee_id !== undefined)
        setPendingReqs(
          pendingReqs.filter((r) => r.id !== (data as Rating).trainee_id)
        );
    },
    onError: (error) => {
      notify('error', 'Não foi possível deletar o convite. Tente novamente.');
      console.error('Error deleting invite', error);
    },
  });

  const { data: pendingData, isLoading: isLoadingPending } = useQuery({
    queryKey: ['pendingReqs', user.token],
    queryFn: () => getRatings({ token: user.id, status: 'pending' }),
  });

  const { data: acceptedData, isLoading: isLoadingAccepted } = useQuery({
    queryKey: ['acceptedReqs', user.token],
    queryFn: () => getRatings({ token: user.id, status: 'accepted' }),
  });

  useEffect(() => {
    if (data) setPendingReqs(data);
  }, [data]);

  useEffect(() => {
    if (pendingData) setPendData(pendingData);
  }, [pendingData]);

  useEffect(() => {
    if (acceptedData) setAccData(acceptedData);
  }, [acceptedData]);


  const handledecision = (id: string, type: string) => {
    const decisioned = pendData?.find((r) => r.trainee_id === id);
    setPendData(pendData?.filter((r) => r.trainee_id !== id));
    if (type === 'accepted' && decisioned)
      setAccData(prev => {
        prev.find((r) => r.trainee_id === id) ? prev : prev.push(decisioned)
        return prev;
      });
  }

  const handleDelete = (id: string) => {
    console.log('Deleted', id);
    console.log(accData?.filter((r) => r.trainee_id !== id));
    setAccData(accData?.filter((r) => r.trainee_id !== id));
  }

  const mutateSort = useMutation({
    mutationFn: updateCommentsSort,
    mutationKey: ['updateCommentsSort', user.id, sortType],
    onSuccess: (data) => {
      console.log('Updated', data);
    },
    onError: (error) => {
      console.error('Error updating rating', error);
    },
  });

  const handleSortChange = () => {
    updatePageField('comments_sort', sortType);
    mutateSort.mutate({ personal_id: user.id, comments_sort: sortType });
  }

  return (
    <>
      <div className="flex w-full gap-16 px-32">
        <div className="mb-10 flex w-full flex-col gap-10">
          <div>
            <h2 className="pb-2 text-4xl font-bold text-secondary">
              Avaliações
            </h2>
            <p className="font-light text-muted">
              Conte para seus seguidores o que você está fazendo!
            </p>
          </div>

          <div className="flex flex-col gap-5 rounded-lg border px-12 pb-10 pt-6">
            <div>
              <h4 className="text-lg text-secondary">
                Peça uma avaliação do seu Aluno
              </h4>
              <p className="text-sm text-muted">
                Você pode mandar para o aluno avaliar como foi seu serviço.
              </p>
            </div>
            <div className="relative">
              <LabeledInput
                label="Nome do Aluno"
                placeholder="Digite o nome do aluno..."
                onChange={handleInviteTrainee}
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
                Requisições de alunos pendentes
              </h1>
              {pendingReqs.length === 0 ? (
                <div className="rounded-xl border py-5">
                  <p className="text-center text-xs text-muted">
                    Nenhuma avaliação pendente
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
                      <p className="text-xs text-muted">Avaliação pendente</p>
                    </div>
                    <X
                      size={16}
                      strokeWidth={2}
                      className="cursor-pointer text-muted-foreground"
                      onClick={() => {
                        mutateDeleteInvite.mutate({
                          trainee_id: req.id,
                          personal_id: user.id,
                        });
                      }}
                    />
                  </div>
                ))
              )}
            </div>
          )}

          <Accordion type="multiple" className="flex flex-col gap-10">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <h3 className="text-xl font-bold text-secondary">
                  {isLoadingPending || pendData?.length === 0
                    ? 'Avaliações Pendentes'
                    : `Avaliações Pendentes (${pendData?.length})`}
                </h3>
              </AccordionTrigger>
              <AccordionContent>
                {isLoadingPending ? (
                  <Loader />
                ) : pendData && pendData.length > 0 ? (
                  <div className="flex flex-col gap-5">
                    {pendData.map((rating) => (
                      <RatingCard
                        status="pending"
                        key={rating.trainee_id}
                        data={rating}
                        onSubmit={handledecision}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border py-5">
                    <p className="text-center text-xs text-muted">
                      Nenhuma avaliação pendente
                    </p>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <h3 className="text-xl font-bold text-secondary">
                  {isLoadingAccepted || accData?.length === 0
                    ? 'Avaliações Aceitas'
                    : `Avaliações Aceitas (${accData?.length})`}
                </h3>
              </AccordionTrigger>
              <AccordionContent>
                {isLoadingAccepted ? (
                  <Loader />
                ) : accData && accData.length > 0 ? (
                  <div className="flex flex-col gap-5">

                    <div className='flex flex-col gap-4 pt-4 pb-6 border px-6 rounded-lg'>
                      <p className='font-bold'>Como você deseja ordenar seus comentários?</p>
                      <RadioGroup defaultValue={sortType} className='flex gap-5'
                        onValueChange={(value) => setSortType(value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="time_desc" id="r1" />
                          <Label htmlFor="r1">Ordem Cronológica</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="rating_desc" id="r2" />
                          <Label htmlFor="r2">Estrelas Decrescente</Label>
                        </div>
                      </RadioGroup>
                      <Button variant='outline' className='w-24 text-xs' size='sm'
                        onClick={handleSortChange}
                      >Aplicar</Button>
                    </div>

                    {accData.map((rating) => (
                      <RatingCard
                        status="accepted"
                        key={rating.trainee_id}
                        data={rating}
                        onSubmit={handledecision}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border py-5">
                    <p className="text-center text-xs text-muted">
                      Nenhuma avaliação pendente
                    </p>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};
