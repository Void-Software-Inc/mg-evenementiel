import ProductDisplay from './ProductDisplay';

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className=" h-[140vh] md:h-[90vh] w-full flex justify-center">
      <ProductDisplay id={params.id} />
    </div>
  );
}