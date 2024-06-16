import { Button } from "@/components/ui/button";

// @types
type CtaProps = {
  children: React.ReactNode
  className?: string
}

export const Cta = ({ children, className = "" }: CtaProps) => {
  return (
    <Button className={`w-fit px-8 py-6 rounded-3xl font-normal text-base ${className}`}>{children}</Button>
  );
}
