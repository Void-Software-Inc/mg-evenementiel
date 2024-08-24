
export default async function QuotePage({ params }: { params: { id: string } }) {
  return (
    <>
      <h1 className="text-2xl font-bold text-black h-[100vh] w-full flex justify-center items-center">
        {params.id}
      </h1>
    </>
  )
}