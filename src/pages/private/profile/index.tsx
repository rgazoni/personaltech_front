import { Layout } from '@/components/common/layout';
import useAppStore from '@/store';
import { useEffect, useReducer, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  TraineeReqs,
  deleteInvite,
  getTraineeReqs,
  updateRating,
} from '@/api/ratings';
import { AvatarProfileImg } from '@/components/common/avatar-profile-img';
import { ExternalLink } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast.hook';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { initialState, passwordReducer } from '@/reducers/signup-validation';
import { updateClientInfo, updatePassword } from '@/api/user';
import { getTraineeClasses, updateClass } from '@/api/classes';
import { formatInTimeZone } from 'date-fns-tz';

const Star = ({ selected, onClick }: { selected: any; onClick: any }) => (
  <div>
    <svg
      onClick={onClick}
      height="25px"
      width="25px"
      viewBox="0 0 25 25"
      fill={selected ? '#fae100' : '#f0f1f2'}
      strokeWidth="2"
      strokeLinejoin="round"
    >
      <polygon points="12.5,0 16,8 25,9 18,15 19,24 12.5,20 6,24 7,15 0,9 9,8" />
    </svg>
  </div>
);

const RateStar = ({
  totalStars = 5,
  onRatingChange,
}: {
  totalStars: number;
  onRatingChange: (num: number) => void;
}) => {
  const [selectedStars, setSelectedStars] = useState(0);

  const handleStarClick = (index: number) => {
    setSelectedStars(index + 1);
    if (onRatingChange) {
      onRatingChange(index + 1); // Notify parent of the rating
    }
  };

  return (
    <div className="flex cursor-pointer gap-2">
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          selected={index < selectedStars}
          onClick={() => handleStarClick(index)}
        />
      ))}
    </div>
  );
};

const Rate = ({
  personal,
  onDialog,
  canPop,
}: {
  personal: TraineeReqs;
  onDialog: (u: boolean) => void;
  canPop: () => void;
}) => {
  const [rating, setRating] = useState(0);
  const { notify } = useToast();

  const mutateRate = useMutation({
    mutationFn: updateRating,
    mutationKey: ['updateRating'],
    onSuccess: () => {
      notify('success', 'Avaliação enviada com sucesso 🚀');
      canPop();
    },
    onError: (error) => {
      console.error('Error deleting invite', error);
    },
  });
  const cl = useAppStore((state) => state.client);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-4">
          <AvatarProfileImg
            src={personal.avatar}
            alt={personal.page_name}
            size={50}
          />
          <div>
            <span className="text-xl">Avaliação</span>
            <p className="text-xs font-light text-muted">
              Deixe sua avaliação para {personal.page_name}
            </p>
          </div>
        </DialogTitle>
      </DialogHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);

          // Get current date in Sao Paulo timezone
          const timeZone = 'America/Sao_Paulo';
          const now = new Date();
          const userResponseDate = formatInTimeZone(now, timeZone, 'yyyy-MM-dd HH:mm:ss');
          const date = new Date(userResponseDate);

          const formValues = {
            personal_id: personal.id,
            trainee_id: cl.id,
            rating,
            request: 'accepted',
            comment: (formData.get('comments') as string) || '',
            userResponseAt: date,
          };
          mutateRate.mutate(formValues);
        }}
      >
        <div className="grid gap-4 py-4">
          <div className="flex w-fit flex-col items-start gap-4">
            <Label htmlFor="name" className="text-left">
              Qualidade do serviço
            </Label>
            <RateStar totalStars={5} onRatingChange={setRating} />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="username" className="">
              Comentários (opcional)
            </Label>
            <Textarea
              id="comments"
              name="comments"
              placeholder="Deixe seu feedback aqui..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => onDialog(false)}>
            Avaliar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

const Invites = () => {
  const client = useAppStore((state) => state.client);
  const [traineeReqs, setTraineeReqs] = useState<TraineeReqs[]>([]);
  const navigate = useNavigate();
  const { notify } = useToast();
  const [_, setIsDialogOpen] = useState(false);

  const { data, isPending, isSuccess } = useQuery({
    queryKey: [],
    queryFn: () => getTraineeReqs(client.id),
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (isSuccess && data.length !== 0) {
      setTraineeReqs(data);
    }
  }, [isSuccess, data]);

  const mutateDeleteInvite = useMutation({
    mutationFn: deleteInvite,
    mutationKey: ['deleteInvite'],
    onSuccess: () => {
      notify('success', 'Convite deletado com sucesso ✉️');
    },
    onError: (error) => {
      console.error('Error deleting invite', error);
    },
  });

  const handleDelete = (personal_id: string) => {
    mutateDeleteInvite.mutate({
      trainee_id: client.id,
      personal_id: personal_id,
    });
    setTraineeReqs((prevReqs) => prevReqs.filter((r) => r.id !== personal_id));
  };

  const handlePop = (id: string) => {
    setTraineeReqs((prevReqs) => prevReqs.filter((r) => r.id !== id));
  };

  // Loader handling and rendering the invites
  return (
    <Card className="grid grid-cols-3 pt-6">
      {isPending ? (
        // Show loading indicator while data is being fetched
        <div className="col-span-3 flex justify-center">
          <p className="text-muted">Carregando convites...</p>
        </div>
      ) : isSuccess && traineeReqs.length > 0 ? (
        // Show trainee requests if available
        traineeReqs.map((req) => (
          <CardContent key={req.id} className="space-y-2">
            <div className="flex w-72 flex-col gap-4 rounded-lg border bg-secondary-foreground p-5">
              <div className="flex w-full">
                <div className="flex w-full items-center gap-2">
                  <AvatarProfileImg
                    src={req.avatar}
                    alt={req.page_name}
                    size={64}
                  />
                  <div>
                    <h5 className="text-xs text-secondary">{req.page_name}</h5>
                    <p className="text-xs text-muted">Avaliação Pendente</p>
                  </div>
                </div>
                <ExternalLink
                  size={14}
                  className="cursor-pointer text-secondary"
                  onClick={() => navigate('/u/' + req.url)}
                />
              </div>
              <div className="flex w-full justify-end gap-3">
                <Button
                  variant="ghost"
                  className="cursor-pointer text-xs"
                  onClick={() => handleDelete(req.id)}
                >
                  Recusar
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="default"
                      className="cursor-pointer px-8 text-xs"
                      onClick={() => setIsDialogOpen(true)}
                    >
                      Avaliar
                    </Button>
                  </DialogTrigger>
                  <Rate
                    personal={req}
                    onDialog={setIsDialogOpen}
                    canPop={() => handlePop(req.id)}
                  />
                </Dialog>
              </div>
            </div>
          </CardContent>
        ))
      ) : (
        // Show message if there are no invites
        <div className="col-span-3">
          <p className="pb-8 pt-3 text-center text-muted">
            Você ainda não possui convites 😕
          </p>
        </div>
      )}
    </Card>
  );
};

export const Profile = () => {
  const [greeting, setGreeting] = useState('');
  const client = useAppStore((state) => state.client);
  const [searchParams, _] = useSearchParams();
  const { notify } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Bom dia');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
  }, []);

  const tab = searchParams.get('tab') || 'info';

  const [{ len, equals }, dispatch] = useReducer(passwordReducer, initialState);
  const mutatePsswd = useMutation({
    mutationFn: updatePassword,
    mutationKey: ['updatePsswd', client.id],
    onSuccess: () => {
      notify('success', 'Avaliação enviada com sucesso 🚀');
    },
    onError: (error) => {
      console.error('Error deleting invite', error);
      notify('error', 'Erro ao alterar senha 😕, confira os campos e tente novamente.');
    },
  });
  const birthdate = new Date(client.birthdate).toISOString().substring(0, 10);


  const mutateTInfo = useMutation({
    mutationFn: updateClientInfo,
    mutationKey: ['update', client.id],
    onSuccess: () => {
      notify('success', 'Informações atualizadas com sucesso 🚀');
    },
    onError: (error) => {
      console.error('Error updating client info', error);
      notify('error', 'Erro ao atualizar informações 😕, confira os campos e tente novamente.');
    },
  });

  const { data: traineeClasses, isSuccess, refetch, isRefetching } = useQuery({
    queryKey: ['traineeClasses', client.id],
    queryFn: () => getTraineeClasses(client.id),
  });

  //TODO send invite to trainee with mutation
  const mutateRespondClass = useMutation({
    mutationFn: updateClass,
    mutationKey: ['updateClass'],
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error sending invite', error);
      notify('error', 'Erro ao enviar convite. Tente novamente mais tarde.');
    },
  });

  const handleAcceptClass = (id: string) => {
    mutateRespondClass.mutate({
      id,
      status: 'accepted',
    });
  }
  const handleRejectClass = (id: string) => {
    mutateRespondClass.mutate({
      id,
      status: 'rejected',
    });
  }

  return (
    <div className='min-h-screen'>
      <Layout className='h-fit flex flex-col grow min-h-screen'>
        <div className="flex flex-col gap-8 px-24 h-full flex-grow">
          <div>
            <h1 className="text-3xl font-light text-secondary">
              {greeting} <span>{client.full_name},</span>
            </h1>
            <p className="pt-2 text-muted">Que bom tê-la aqui de novo!</p>
          </div>

          {isSuccess && traineeClasses.length > 0 && !isRefetching ? (
            <Card className="flex flex-col pt-6">
              <CardContent className="space-y-2">
                <h3 className="text-2xl font-light text-secondary">
                  Requisições de Aula
                </h3>
                <p className="text-muted">
                  Responda a requisição do professor para que ele possa iniciar a aula.
                </p>
              </CardContent>
              {traineeClasses.map((c) => (
                <CardContent key={c.class_id} className="space-y-2">
                  <div className="flex w-fit flex-col gap-4 rounded-lg border bg-secondary-foreground p-5">
                    <div className="flex w-full gap-3">
                      <div className="flex w-full items-center gap-4">
                        <AvatarProfileImg
                          src={c.avatar}
                          alt={c.page_name}
                          size={64}
                        />
                        <div className='space-y-2'>
                          <h5 className="text-xs text-secondary">{c.page_name}</h5>
                          <div className="flex gap-2">
                            <Button variant="outline" className="text-xs" size="sm" onClick={() => handleRejectClass(c.class_id)}>
                              Rejeitar
                            </Button>
                            <Button className="text-xs" size="sm" onClick={() => handleAcceptClass(c.class_id)}>
                              Aceitar
                            </Button>
                          </div>
                        </div>
                      </div>
                      <ExternalLink
                        size={14}
                        className="cursor-pointer text-secondary"
                        onClick={() => navigate('/u/' + c.url)}
                      />
                    </div>
                  </div>
                </CardContent>
              ))}
            </Card>
          ) : (
            <></>
          )
          }

          <Tabs defaultValue={tab} className="w-full h-full flex flex-col mt-5">
            <TabsList className="grid w-full grid-cols-3 bg-primary text-white">
              <TabsTrigger value="info">Minhas Informações</TabsTrigger>
              <TabsTrigger value="invites">Convites de Avaliação</TabsTrigger>
              <TabsTrigger value="password">Alteração de senha</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="mt-10">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    Atualize suas informações pessoais.
                  </CardDescription>
                </CardHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const formValues = {
                      email: formData.get('email') as string,
                      birthdate: formData.get('birthdate') as string,
                      full_name: formData.get('name') as string,
                      state: formData.get('state') as string,
                      city: formData.get('city') as string,
                    };
                    console.log(formValues);
                    mutateTInfo.mutate({
                      id: client.id,
                      client: formValues
                    });
                  }}
                >
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" name='name' defaultValue={client.full_name} />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name='email' defaultValue={client.email} disabled={true} />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="birthdate">Data de Nascimento</Label>
                        <Input id="birthdate" name='birthdate' defaultValue={birthdate} type='date' />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <Label htmlFor="state">Estado</Label>
                        <Input id="state" defaultValue={client.state} name='state' />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="city">Cidade</Label>
                        <Input id="city" defaultValue={client.city} name='city' />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Atualizar informações</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="invites" className="mt-10 h-full grow">
              <Invites />
            </TabsContent>
            <TabsContent value="password" className="mt-10">
              <Card>
                <CardHeader>
                  <CardTitle>Alteração de senha</CardTitle>
                  <CardDescription>Altere sua senha.</CardDescription>
                </CardHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const formValues = {
                      old_password: formData.get('old_password') as string,
                      new_password: formData.get('new_password') as string,
                      trainee_id: client.id,
                    };
                    mutatePsswd.mutate(formValues);
                  }}
                >
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="old_password">Senha antiga</Label>
                      <Input
                        id="old_password"
                        type="password"
                        name="old_password"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <Label htmlFor="new_password">Nova senha</Label>
                        <Input
                          id="new_password"
                          type="password"
                          name="new_password"
                          onChange={(e) =>
                            dispatch({
                              type: 'password-length',
                              payload: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="confirm_new_password">
                          Confirmar nova senha
                        </Label>
                        <Input
                          id="confirm_new_password"
                          type="password"
                          onChange={(e) =>
                            dispatch({
                              type: 'password-equals',
                              payload: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col pt-4 text-sm font-light text-tertiary">
                      <div className="flex gap-2">
                        <p>Senha deve conter no mínimo 8 caracteres</p>
                        {len && <span>✅</span>}
                      </div>
                      <div className="flex gap-2">
                        <p>Ambas as senhas devem ser iguais</p>
                        {equals && <span>✅</span>}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={!len || !equals}>
                      Atualizar senha
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </div>
  );
};
