import { useNavigate } from 'react-router-dom';
import './styles.css';

// @types
type ModalProps = {
  children: React.ReactNode;
};

export const Modal = ({ children }: ModalProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="circle modal-top-left absolute"></div>
      <div className="circle modal-bottom-right absolute"></div>

      <div className="z-50 flex flex-col items-center justify-center rounded-lg bg-white p-7 shadow-xl md:w-full md:rounded-none md:bg-transparent md:p-0 md:shadow-none">
        <div className='p-1 cursor-pointer' onClick={() => navigate('/search')}>
          <h1 className="mb-5 text-4xl font-bold text-primary md:absolute md:left-16 md:top-8">
            Personal<span className="font-light italic">tech</span>
          </h1>
        </div>

        <div className="relative z-50 flex h-fit w-5/6 flex-col justify-center rounded-lg p-5 md:w-4/6 md:bg-white md:p-20 md:shadow-xl lg:w-3/6">
          {children}
        </div>
      </div>
    </div>
  );
};
