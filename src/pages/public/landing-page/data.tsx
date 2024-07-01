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
    rating: 1,
    profile: "https://www.instagram.com",
  },
  {
    photo: "https://i.pinimg.com/280x280_RS/0e/df/ca/0edfca31eb7c0de0c6de8f7f9250b81d.jpg",
    name: "Fernando Kira",
    profession: "Coach Quântico",
    rating: 5.0,
    profile: "https://www.instagram.com",
  },
  {
    photo: "https://costazul.fm/wp-content/uploads/2023/12/Renato-Cariani-e-investigado-pela-Policia-Federal-por-trafico-de-drogas.jpg",
    name: "Renato Cariani",
    profession: "Personal Trainer",
    rating: 4.5,
    profile: "https://www.instagram.com",
  },
]
