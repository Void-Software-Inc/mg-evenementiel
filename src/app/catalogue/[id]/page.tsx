import ProductDisplay from './ProductDisplay';

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="h-[100vh] py-8 flex justify-center items-center">
      <ProductDisplay id={params.id} />
    </div>
  );
}