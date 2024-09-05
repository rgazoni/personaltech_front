import { Footer } from "../footer"
import { Header } from "../header"

//@types
type LayoutProps = {
  children: React.ReactNode;
  bgColorPP?: string;
}

export const Layout = ({ children = <></>, bgColorPP }: LayoutProps) => {
  return (

    <div className="lg:px-16 px-6">
      <Header bgColorPP={bgColorPP} />
      {children}
      {
        // <Footer /> }
        //
      }
      <Footer />
    </div>

  )
}
