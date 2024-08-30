import CatalogDisplay from "./components/CatalogDisplay";
import { ProductProvider } from '@/app/context/ProductContext';

const CataloguePage: React.FC = () => {
  return (
      <>
        <ProductProvider>
          <CatalogDisplay />
        </ProductProvider>
        <div className="h-12 w-full bg-white"></div>
      </>
  );
};

export default CataloguePage;
