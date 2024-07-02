import './styles.css';

// @types
type ModalProps = {
  children: React.ReactNode
}

export const Modal = ({ children }: ModalProps) => {
  return (
    <div className="flex justify-center h-screen items-center flex-col">

      <div className="absolute circle modal-top-left"></div>
      <div className="absolute circle modal-bottom-right"></div>

      <h1 className="md:absolute md:top-8 md:left-16 font-bold text-4xl text-primary">
        Personal<span className="font-light italic">tech</span>
      </h1>

      <div className="relative z-50 p-5 md:p-20 md:bg-white w-5/6 md:w-3/6 flex flex-col 
        justify-center h-fit rounded-lg md:shadow-xl">
        {children}
      </div>
    </div>
  );
}
