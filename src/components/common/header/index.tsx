import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="flex justify-between items-center pb-20 pt-8 relative z-50">
      <h1 className="font-bold text-4xl text-primary">
        Personal<span className="font-light italic">tech</span>
      </h1>
      <div className="hidden md:flex lg:flex gap-3 px-6">
        <Button variant={null} className="text-muted font-normal">Dar aulas</Button>
        <Button className="px-6">Login</Button>
      </div>
    </header>
  );
}
