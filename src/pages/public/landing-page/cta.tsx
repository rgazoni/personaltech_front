import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// @types
type CtaProps = {
  children: React.ReactNode
  className?: string
  path?: string
}

export const Cta = ({ children, className = "", path = '' }: CtaProps) => {
  const navigate = useNavigate();
  return (
    <Button className={`w-fit px-8 py-6 rounded-3xl font-normal text-base ${className}`}
      onClick={() => navigate(path)}
    >{children}</Button>
  );
}
