import { Star } from "lucide-react"
import { TrainerRating } from "./data"
import { Cta } from "./cta"

// @types
type RatingProps = {
  trainer_rating: TrainerRating
}

export const RatingCard = ({ trainer_rating }: RatingProps) => {

  return (
    <div className="flex gap-6 flex-col bg-secondary items-center rounded-xl container w-64">
      <div className="h-28 w-28 -mt-14 rounded-full">
        <img
          src={trainer_rating.photo}
          alt={trainer_rating.name}
          className="rounded-full h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col gap-3 text-center items-center pb-5">
        <p className="font-semibold text-2xl text-secondary-foreground">{trainer_rating.name}</p>
        <p className="text-secondary-foreground font-extralight">{trainer_rating.profession}</p>
        <div className="flex gap-1 justify-center">
          <Star size={16} fill="#FFC728" stroke="#FFC728" />
          <Star size={16} fill="#FFC728" stroke="#FFC728" />
          <Star size={16} fill="#FFC728" stroke="#FFC728" />
          <Star size={16} fill="#FFC728" stroke="#FFC728" />
          <Star size={16} fill="#FFC728" stroke="#FFC728" />
        </div>
        <p className="text-muted-foreground text-sm">Avaliações de usuários</p>
        <Cta className="bg-footer-background py-5 px-6 hover:bg-footer-background">
          <span className="font-light text-sm">Ver perfil</span>
        </Cta>
      </div>
    </div>
  )
}
