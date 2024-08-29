import { DevisProvider } from '@/app/context/DevisContext';
import Stepper from './Stepper';

const DevisDisplay = () => {
  return (
    <DevisProvider>
      <div className="flex flex-col items-center min-h-screen w-[90%] mx-auto mt-28 pb-20">
        <Stepper />
      </div>
    </DevisProvider>
  );
};

export default DevisDisplay;