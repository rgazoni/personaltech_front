import { Layout } from "@/components/common/layout";
import CurvedLine from "./curved-line";
import { Cta } from "./cta";
import { Check, Star } from "lucide-react";
import { trainer_benefits, trainer_ratings, user_benefits } from "./data";
import { RatingCard } from "./rating-card";
import "./styles.css";

export const LandingPage = () => {

  return (
    <Layout>
      <div className="absolute lp-circle lp-top-left"></div>
      <div className="absolute lp-circle lp-middle-right"></div>
      <div className="absolute lp-circle lp-bottom-right"></div>

      <div className="flex justify-between gap-16 relative z-50 overflow-y-hidden">
        <div className="lg:w-1/3 flex flex-col gap-6">
          <h2
            className="font-bold text-5xl lg:text-6xl text-secondary w-full"
          >
            Conectamos você com os melhores treinadores
          </h2>
          <CurvedLine />
          <h3 className="text-base lg:w-72 text-muted leading-relaxed">
            Conheça milhares de profissionais especializados em só um lugar.
          </h3>
          <Cta className="mt-2" path="/search">
            Encontrar um personal
          </Cta>
        </div>
        <div className="container rounded-md mx-auto relative w-3/6 overflow-hidden hidden md:hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1590556409324-aa1d726e5c3c?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Background"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%]
            hidden md:hidden lg:block"
          />
        </div>
      </div>

      <div className="mt-40 mb-32 lg:my-40 bg-[#F9F8FE] -mx-6 lg:-mx-16 relative z-50">
        <div className="lg:mx-16 px-6">
          <div className="block lg:flex py-14 justify-between gap-10">
            <div className="lg:w-1/2 flex flex-col justify-between gap-10 lg:gap-0 pb-10 lg:pb-0">
              <div className="flex flex-col gap-6">
                <p className="font-semibold text-4xl lg:text-5xl">Como funciona</p>
                <p className="text-muted w-11/12 lg:w-96 leading-relaxed">
                  Com nossa potente ferramenta de busca, você encontra os melhores profissionais
                  para te auxiliar em sua jornada de saúde.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-1">
                  <Star size={26} fill="#FFC728" stroke="#FFC728" />
                  <Star size={26} fill="#FFC728" stroke="#FFC728" />
                  <Star size={26} fill="#FFC728" stroke="#FFC728" />
                  <Star size={26} fill="#FFC728" stroke="#FFC728" />
                  <Star size={26} fill="#FFC728" stroke="#FFC728" />
                </div>
                <p><span className="font-bold">4.9 </span>/ 5 rating</p>
                <p className="text-muted font-bold">Avaliações de usuários</p>
              </div>
            </div>
            <div className="lg:w-1/2 flex flex-col gap-12">
              {user_benefits.map((benefit) => (
                <div className="flex gap-6">
                  <div className="bg-white h-fit w-fit p-2 shadow-md rounded">
                    {benefit.icon}
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-secondary">{benefit.title}</p>
                    <p className="text-muted leading-relaxed max-w-96">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-col items-center relative z-50">
        <p className="text-2xl lg:text-4xl text-center leading-relaxed lg:w-4/6">
          Mais de 5000 pessoas já encontraram ser personal através do Personal
          <span className="font-light italic">tech</span>.
        </p>
        <Cta className="mt-6 mx-auto" path="/search">
          Encontrar um personal
        </Cta>
      </div>

      <div className="my-32 lg:my-44 flex gap-0 lg:gap-20 relative z-50">
        <div className="lg:w-1/2 flex flex-col gap-10">
          <h2 className="font-semibold text-4xl lg:text-5xl text-primary"> Se você é um treinador, aqui é sua vitrine!</h2>
          <p className="text-muted text-lg">
            Temos mais de 1000 visitantes todos os dias buscando por um profissional, que pode ser você!
          </p>
          <ul className="flex flex-col gap-5">
            {trainer_benefits.map((benefit) => (
              <li className="flex gap-3 items-center">
                <div className="bg-primary rounded-3xl p-1 flex items-center">
                  <Check size={16} stroke="white" strokeWidth={3} />
                </div>
                <p>{benefit}</p>
              </li>
            ))}
          </ul>
          <Cta className="bg-secondary hover:bg-secondary"
            path="/create"
          >Quero dar aulas</Cta>
        </div>

        <div className="container rounded-md mx-auto relative w-3/6 overflow-hidden hidden md:hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Background"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%]
            hidden md:hidden lg:block"
          />
        </div>
      </div>

      <div className="bg-footer-background -mx-6 lg:-mx-16 flex flex-col justify-center items-center pb-20 gap-10 relative z-50">
        <h3 className="text-center text-white text-4xl py-20 lg:w-4/12">
          Nossos treinadores melhor avaliados
        </h3>

        <div className="flex lg:w-4/6 gap-24 lg:gap-10 justify-center flex-wrap lg:flex-nowrap">
          {trainer_ratings.map((trainer_rating) => (
            <RatingCard trainer_rating={trainer_rating} />
          ))}
        </div>

        <Cta
          path="/create"
        >Quero dar aulas</Cta>
      </div>
    </Layout>
  );
}
