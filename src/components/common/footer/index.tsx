
export const Footer = () => {
  return (
    <footer className="bg-footer-background -mx-16 -mb-8 pt-24 relative z-50">
      <div className="px-16 py-8">
        <h1 className="font-bold text-4xl text-primary">
          Personal<span className="font-light italic">tech</span>
        </h1>
        <div className="flex justify-between">
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
