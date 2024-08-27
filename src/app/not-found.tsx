import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-fit bg-white my-40 xl:my-80">
        <div className="w-[80%] h-fit flex flex-col items-center justify-center text-center">
      <h2 className="text-7xl md:text-9xl font-extralight">404</h2>
      <p className="text-xl mb-4 font-light">Oups ! La page que vous recherchez n'existe pas.</p>
      <p className="text-lg mb-8 font-light">Pas de panique, nous sommes là pour vous aider à retrouver votre chemin.</p>
      <Button asChild className="rounded-full py-6 px-8 text-lg font-light">
        <Link href="/" className="">Retour à l'Accueil</Link>
      </Button>
      </div>
    </div>
  )
}