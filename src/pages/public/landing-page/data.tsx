import { Activity, Search, Zap } from "lucide-react";

export const user_benefits = [
  {
    icon: <Search size={30} className="text-primary" />,
    title: "Busque",
    description: "Selecione a região, a modalidade e escolha o profissional que mais se encaixa com você.",
  },
  {
    icon: <Zap size={30} className="text-primary" />,
    title: "Se conecte",
    description: "Integração com whatsapp",
  },
  {
    icon: <Activity size={30} className="text-primary" />,
    title: "Inicie seu treino",
    description: "Combine com o profissional o melhor horário e local para iniciar seu treino.",
  },
];

export const trainer_benefits = [
  "Página customizável",
  "Contato direto com Aluno",
  "Diminuição de custos com marketing",
  "Aumento de visibilidade",
]

export type TrainerRating = {
  photo: string
  name: string
  profession: string
  rating: number
  profile: string
}

export const trainer_ratings: TrainerRating[] = [
  {
    photo: "https://media.licdn.com/dms/image/C4E03AQH36KTsmTeiJg/profile-displayphoto-shrink_800_800/0/1622411050316?e=1723680000&v=beta&t=HjMyBVUR-hIbe8loCZ0-Hi8j_WRMz1SlPX_rvrUyJ3Y",
    name: "Enzo Padovani",
    profession: "Personal Trainer",
    rating: 4.9,
    profile: "https://www.instagram.com",
  },
  {
    photo: "https://cdn.discordapp.com/attachments/750815667850313798/1251648667715240086/bfl.png?ex=666f5828&is=666e06a8&hm=9e1970a450daf264be158c19cb0ec6c5059ae27189393def8298e7f34c072759&",
    name: "BFL Esportes",
    profession: "Acessoria Esportiva",
    rating: 5.0,
    profile: "https://www.instagram.com",
  },
  {
    photo: "https://media.licdn.com/dms/image/D5612AQHXYMPh2-QXXQ/article-cover_image-shrink_423_752/0/1703152473673?e=1723680000&v=beta&t=cUQVUJlDpbP5c5lNitQ9ZdBovsUvogu6Uvynp5Iik44",
    name: "Usain Bolt",
    profession: "Runner",
    rating: 5.0,
    profile: "https://www.instagram.com",
  },
]
