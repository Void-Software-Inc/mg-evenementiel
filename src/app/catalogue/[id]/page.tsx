import ProductDisplay from './ProductDisplay';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="h-full w-full flex justify-center">
      <ProductDisplay id={id} />
    </div>
  );
}