import { Layout } from "@/components/common/layout";
import useAppStore from "@/store";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useMutation, useQuery } from "@tanstack/react-query";
import { TraineeReqs, deleteInvite, getTraineeReqs, updateRating } from "@/api/ratings";
import { AvatarProfileImg } from "@/components/common/avatar-profile-img";
import { ExternalLink } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast.hook";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea";

const Star = ({ selected, onClick }: { selected: any, onClick: any }) => (
  <div>
    <svg
      onClick={onClick}
      height="25px"
      width="25px"
      viewBox="0 0 25 25"
      fill={selected ? "#fae100" : "#f0f1f2"}
      strokeWidth="2"
      strokeLinejoin="round"
    >
      <polygon points="12.5,0 16,8 25,9 18,15 19,24 12.5,20 6,24 7,15 0,9 9,8" />
    </svg>
  </div>
);

const RateStar = ({ totalStars = 5, onRatingChange }: { totalStars: number, onRatingChange: (num: number) => void }) => {
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

const Rate = ({ personal, onDialog, canPop }:
  { personal: TraineeReqs, onDialog: (u: boolean) => void, canPop: () => void }) => {
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
    }
  });
  const cl = useAppStore((state) => state.client);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="flex gap-4 items-center">
          <AvatarProfileImg src={personal.avatar} alt={personal.page_name} size={50} />
          <div>
            <span className="text-xl">Avaliação</span>
            <p className="text-xs font-light text-muted">Deixe sua avaliação para {personal.page_name}</p>
          </div>
        </DialogTitle>
      </DialogHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          //TODO FIX DATE FORMAT
          const userResponseDate = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
          const dateObject = new Date(userResponseDate);
          const formValues = {
            personal_id: personal.id,
            trainee_id: cl.id,
            rating,
            request: "pending",
            comment: formData.get('comments') as string || '',
            userResponseAt: dateObject,
          };
          mutateRate.mutate(formValues);
        }}
      >
        <div className="grid gap-4 py-4">
          <div className="flex items-start gap-4 flex-col w-fit">
            <Label htmlFor="name" className="text-left">
              Qualidade do serviço
            </Label>
            <RateStar totalStars={5} onRatingChange={setRating} />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="username" className="">
              Comentários
            </Label>
            <Textarea
              id="comments"
              name="comments"
              placeholder="Deixe seu feedback aqui..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => onDialog(false)}>Avaliar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

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
    mutateDeleteInvite.mutate({ trainee_id: client.id, personal_id: personal_id });
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
            <div className="flex flex-col bg-secondary-foreground p-5 gap-4 border rounded-lg w-72">
              <div className="flex w-full">
                <div className="flex gap-2 items-center w-full">
                  <AvatarProfileImg src={req.avatar} alt={req.page_name} size={64} />
                  <div>
                    <h5 className="text-secondary text-xs">{req.page_name}</h5>
                    <p className="text-muted text-xs">Avaliação Pendente</p>
                  </div>
                </div>
                <ExternalLink
                  size={14}
                  className="text-secondary cursor-pointer"
                  onClick={() => navigate('/u/' + req.url)}
                />
              </div>
              <div className="flex gap-3 w-full justify-end">
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
                      className="cursor-pointer text-xs px-8"
                      onClick={() => setIsDialogOpen(true)}
                    >
                      Avaliar
                    </Button>
                  </DialogTrigger>
                  <Rate personal={req} onDialog={setIsDialogOpen} canPop={() => handlePop(req.id)} />
                </Dialog>
              </div>
            </div>
          </CardContent>
        ))
      ) : (
        // Show message if there are no invites
        <div className="col-span-3">
          <p className="text-center pb-8 pt-3 text-muted">Você ainda não possui convites 😕</p>
        </div>
      )}
    </Card>
  );
};


export const Profile = () => {
  const [greeting, setGreeting] = useState('');
  const client = useAppStore((state) => state.client);
  const [searchParams, _] = useSearchParams();

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

  return (
    <Layout>
      <div className="flex gap-12 justify-between px-16 flex-col">
        <div>
          <h1 className="text-3xl text-secondary font-light">{greeting} <span>{client.full_name},</span></h1>
          <p className="text-muted pt-2">Que bom tê-la aqui de novo!</p>
        </div>

        <Tabs defaultValue={tab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 text-white bg-primary">
            <TabsTrigger value="info">Minhas Informações</TabsTrigger>
            <TabsTrigger value="invites">Convites</TabsTrigger>
            <TabsTrigger value="messages">Mensagens</TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="mt-10">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Data de Nascimento</Label>
                    <Input id="email" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Atualizar informações</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="invites" className="mt-10">
            <Invites />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

