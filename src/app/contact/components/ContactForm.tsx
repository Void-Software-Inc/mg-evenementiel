"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import DatePickerWithRange from "@/components/ui/date-picker-range";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

  export interface FormData {
    prenom: string;
    nom: string;
    societe: string;
    email: string;
    telephone: string;
    date?: DateRange | null;
    message: string;
  }
  
  const formSchema = z.object({
    prenom: z.string().min(2, "Veuillez renseignez votre prénom").max(50, "Limite de 50 caractères dépassée"),
    nom: z.string().min(2, "Veuillez renseignez votre nom").max(20, "Limite de 50 caractères dépassée"),
    societe: z.string(),
    email: z.string().email("Adresse email invalide"),
    telephone: z.string().min(10, "Numéro de téléphone invalide").max(10, "Numéro de téléphone invalide").regex(/^\d{10}$/, "Le numéro de téléphone doit uniquement contenir des chiffres"),
    date: z.any().optional(),
    eventType: z.string().min(1, "Veuillez choisir un type d'événement"),
    traiteur: z.enum(["oui", "non"], { required_error: "Veuillez sélectionner une option" }),
    message: z.string().min(2, "Veuillez écrire un message"),
  });
  
  function ProfileForm() {
    const [date, setDate] = useState<DateRange | undefined>(undefined);
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [eventTypeError, setEventTypeError] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [titleMessage, setTitleMessage] = useState("");
    const [message, setMessage] = useState("");
  
  
  
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: {
        prenom: "",
        nom: "",
        societe: "",
        email: "",
        telephone: "",
        date: undefined,
        eventType: "",
        message: "",
      },
    });
  
    const handleButtonClick = (buttonName: string) => {
      setSelectedButton(buttonName);
      form.setValue('eventType', buttonName); 
      form.clearErrors('eventType');   
    };
    
    const getButtonClass = (buttonName: string) => {
      const baseClass = "py-2 px-6 text-base border border-zinc-300 bg-zinc-50 rounded-3xl shadow-sm ease-in-out transition duration-300 transform active:scale-95 mr-1 overflow-hidden";
      const selectedClass = "text-white text-base bg-zinc-900 border-zinc-700";
      const unselectedHoverClass = "hover:border-zinc-200 hover:bg-zinc-200";
      return buttonName === selectedButton ? `${baseClass} ${selectedClass}` : `${baseClass} ${unselectedHoverClass}`;
    };
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
      if (!selectedButton) {
        setEventTypeError("Choisissez un type d'événement");
        return;
      }
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prenom: values.prenom,
            nom: values.nom,
            societe: values.societe,
            email: values.email,
            telephone: values.telephone,
            date: date ? `${date.from ? format(date.from, 'dd LLL, y', { locale: fr }) : ''} - ${date.to ? format(date.to, 'dd LLL, y', { locale: fr }) : ''}` : "Aucune date sélectionnée",
            eventType: values.eventType,
            traiteur: values.traiteur,
            message: values.message,
          }),      
        });
  
        if (response.ok) {
          setTitleMessage("Message Envoyé !");
          setMessage("Nous vous remercions pour votre prise de contact. Nous allons vous répondre dans les meilleurs délais.");
          form.reset({
            prenom: "",
            nom: "",
            email: "",
            telephone: "",
            date: undefined,
            eventType: "",
            traiteur: "non",
            message: "",
          });
          setDate(undefined);
          setSelectedButton(null);
        } else {
          setTitleMessage("Erreur");
          setMessage("Une erreur est survenue. Veuillez réessayer.");
        }
      } catch (error) {
        setTitleMessage("Erreur");
        setMessage("Une erreur inattendue est survenue.");
      }
      finally {
        setDialogOpen(true);
      }
    }
  
    return (
      <div className="h-fit w-full pb-20">
        <div className="h-fit w-full flex justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 min-w-full sm:min-w-[624px] pt-14">
              <FormField
                control={form.control}
                name="prenom"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-lg font-medium leading-loose text-gray-700 pt-4">Vos coordonnées *</Label>
                    <FormControl>
                      <Input placeholder="Prénom" {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nom" {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />

            <FormField
                control={form.control}
                name="societe"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nom de la société" {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="tel" placeholder="Téléphone" {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
  
          <div>
            <div className="h-full w-full flex justify-start items-center pt-4">
            <Label className="block text-lg font-medium leading-loose text-gray-700 pr-4">Quand aura lieu l'événement ?</Label>
            <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger>
                      <svg width="20" height="20" viewBox="0 0 15 15" fill="none" className="text-gray-500" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Vous pouvez laisser ce champ vide la date n'est pas connue.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                </div>
              <div className="flex items-center space-x-5 relative rounded-md">
                      <DatePickerWithRange
                        date={date} setDate={setDate} className="w-full"
                      />
                   
              </div>
          </div>    
  
            
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
              <FormItem>
                <Label className="block text-lg font-medium leading-loose text-gray-700 pt-4">Quel type d'événement ? *</Label>
                <div className="max-w-[600px] mt-1 pb-5 space-y-2 flex-wrap">
                <button type="button" className={getButtonClass('Mariage')} onClick={() => handleButtonClick('Mariage')}>Mariage</button>
                        <button type="button" className={getButtonClass('Anniversaire')} onClick={() => handleButtonClick('Anniversaire')}>Anniversaire</button>
                        <button type="button" className={getButtonClass('Baptême')} onClick={() => handleButtonClick('Baptême')}>Baptême</button>
                        <button type="button" className={getButtonClass('Professionnel')} onClick={() => handleButtonClick('Professionnel')}>Professionnel</button>
                        <button type="button" className={getButtonClass('Autre')} onClick={() => handleButtonClick('Autre')}>Autre</button>
                </div>
                <FormMessage className="text-left" />
            </FormItem>
            )}
          />
  
        <FormField
          control={form.control}
          name="traiteur"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="traiteur" className="text-lg font-medium leading-loose text-gray-700">
                Souhaitez-vous ajouter l'option traiteur ? *
              </Label>
              <RadioGroup
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
                className="mt-1 px-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non" id="option-one" />
                  <Label className="text-base font-light text-gray-700" htmlFor="option-one">
                    Non
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oui" id="option-two" />
                  <Label className="text-base font-light text-gray-700" htmlFor="option-two">
                    Oui
                  </Label>
                </div>
              </RadioGroup>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />
  
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <Label className="block text-lg font-medium leading-loose text-gray-700 pt-4">
                  Dites-nous en plus sur votre projet *
                </Label>
                <FormControl>
                  <Textarea placeholder="Votre message..." {...field} />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />
          <div className="w-full h-fit flex justify-end">
           <Button type="submit" className="rounded-full h-[65px] w-full sm:h-[78px] sm:w-[170px] py-6 px-12 flex items-center group ease-in-out transition duration-300 hover:bg-neutral-500">
            <span className="font-semibold text-xl">Envoyer</span>
            <span className="ml-2 transition-transform transform group-hover:translate-x-2 duration-300">
              <svg width="28" height="28" className="text-white" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </span>
            </Button>
            </div>
            <div className="h-fit w-full flex justify-end">
            {dialogOpen && (
              <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <AlertDialogTrigger asChild>
               
                </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{titleMessage}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {message}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setDialogOpen(false)}>Fermer</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            )}
            </div>
            </form>
          </Form>
        </div>
      </div>
    );
  }
  
  const ContactForm: React.FC = () => {
    return (
      <div>
        
      <div className="h-full w-full left-0 top-0 -z-10 flex justify-center">
        <div className="h-full w-[90%] sm:w-[93%] lg:w-[70%] mt-28">
          <div className="h-fit w-full text-center pt-14">
          <h1 className='text-xs sm:text-sm font-extralight sm:font-light text-zinc-700 ml-0 sm:ml-2'>CONTACT</h1>
            <p className="text-6xl sm:text-7xl md:text-8xl font-thin tracking-tight block mb-6">DISCUTONS DE VOTRE PROJET !</p>
           
            <p className="text-2xl font-light text-gray-600">Une idée ou une question ? Contactez-nous et discutons.</p>
          </div>
  
          <div className="h-fit w-full mt-10 flex justify-center">
            <div className="h-fit w-full flex justify-center">
              <ProfileForm />
            </div>
            
          </div>
        </div>
      </div> 
      </div>
    );
  };
  export default ContactForm;