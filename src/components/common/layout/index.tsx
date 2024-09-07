import { Footer } from "../footer"
import { Header } from "../header"

//@types
type LayoutProps = {
  children: React.ReactNode;
  bgColorPP?: string;
  className?: string;
}

export const Layout = ({ children = <></>, bgColorPP, className }: LayoutProps) => {
  return (

    <div className={`lg:px-16 px-6 ${className} `}>
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
