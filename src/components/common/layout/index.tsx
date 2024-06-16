import { Footer } from "../footer"
import { Header } from "../header"

//@types
type LayoutProps = {
  children: React.ReactNode
}

export const Layout = ({ children = <></> }: LayoutProps) => {
  return (

    <div className="px-16">
      <Header />
      {children}
      <Footer />
    </div>

  )
}
