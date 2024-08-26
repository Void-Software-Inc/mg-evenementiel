import ProductDisplay from './ProductDisplay';

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="h-full w-full flex justify-center">
      <ProductDisplay id={params.id} />
    </div>
  );
}