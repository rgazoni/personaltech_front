import { Footer } from "../footer"
import { Header } from "../header"

//@types
type LayoutProps = {
  children: React.ReactNode
}

export const Layout = ({ children = <></> }: LayoutProps) => {
  return (

    <div className="lg:px-16 px-6">
      <Header />
      {children}
      {
        // <Footer /> }
        //
      }
      <Footer />
    </div>

  )
}
