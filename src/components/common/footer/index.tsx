
export const Footer = () => {
  return (
    <footer className="bg-footer-background -mx-8 lg:-mx-16 -mb-8 lg:pt-24 relative z-50 mt-28">
      <div className="lg:px-16 py-8 px-6">
        <h1 className="font-bold text-4xl text-primary">
          Personal<span className="font-light italic">tech</span>
        </h1>
        <div className="flex flex-col gap-2 lg:flex-row justify-between">
          <h2 className="text-footer-background-foreground mt-2">
            © 2024 Personaltech. Todos os direitos reservados.
          </h2>
          <nav className="flex gap-6">
            <a href="#" className="text-footer-background-foreground">Termos de uso</a>
            <p className="text-footer-background-foreground">|</p>
            <a href="#" className="text-footer-background-foreground">Política de privacidade</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
