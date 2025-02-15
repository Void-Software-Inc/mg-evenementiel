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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


  export interface FormData {
    prenom: string;
    nom: string;
    email: string;
    telephone: string;
    voie: string;
    compl: string;
    cp: string;
    ville: string;
    depart: string;
    pays: string; 
    date?: DateRange | null;
    message: string;
  }
  
  const formSchema = z.object({
    prenom: z.string().min(2, "Veuillez renseignez votre prénom").max(50, "Limite de 50 caractères dépassée"),
    nom: z.string().min(2, "Veuillez renseignez votre nom").max(20, "Limite de 50 caractères dépassée"),
    email: z.string().email("Adresse email invalide"),
    telephone: z.string().min(10, "Numéro de téléphone invalide").max(10, "Numéro de téléphone invalide").regex(/^\d{10}$/, "Le numéro de téléphone doit uniquement contenir des chiffres"),
    voie: z.string().min(2, "Format invalide").max(100, "Limite de 100 caractères dépassée"),
    compl: z.string().max(100, "Limite de 100 caractères dépassée").optional(),
    cp: z.string().min(5, "Format invalide").max(5, "Format invalide"),
    ville: z.string().min(2, "Veuillez renseigner ce champ").max(100, "Limite de 100 caractères dépassée"),
    depart: z.string().min(1, "Veuillez sélectionner un département"),
    pays: z.string().default("France"), 
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
    const [isSending, setIsSending] = useState(false); // Add state to track sending status
  
  
  
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      mode: "onChange",
      reValidateMode: "onChange",
      defaultValues: {
        prenom: "",
        nom: "",
        email: "",
        telephone: "",
        voie: "",
        compl: "",
        cp: "",
        ville: "",
        depart: "",
        pays: "France",   
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
      setIsSending(true);
      setTitleMessage("Envoi en cours...");
      setMessage("");
      setDialogOpen(true);

      if (!selectedButton) {
        setEventTypeError("Choisissez un type d'événement");
        setIsSending(false);
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
            email: values.email,
            telephone: values.telephone,
            voie: values.voie,
            compl: values.compl,
            cp: values.cp,
            ville: values.ville,
            depart: values.depart,
            pays: values.pays,
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
            voie: "",
            compl: "",
            cp: "",
            ville: "",
            depart: "",
            pays: "France",
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
      } finally {
        setIsSending(false);
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

              <FormField
                control={form.control}
                name="voie"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Voie" {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="compl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Complément d'adresse" {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Code Postal" {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ville"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Ville" {...field} />
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="depart"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionnez un département" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ariege">Ariège</SelectItem>
                          <SelectItem value="Aude">Aude</SelectItem>
                          <SelectItem value="Aveyron">Aveyron</SelectItem>
                          <SelectItem value="Bouches-du-Rhone">Bouches-du-Rhône</SelectItem>
                          <SelectItem value="Gard">Gard</SelectItem>
                          <SelectItem value="Gers">Gers</SelectItem>
                          <SelectItem value="Gironde">Gironde</SelectItem>
                          <SelectItem value="Haute-Garonne">Haute-Garonne</SelectItem>
                          <SelectItem value="Hautes-Alpes">Hautes-Alpes</SelectItem>
                          <SelectItem value="Hautes-Pyrenees">Hautes-Pyrénées</SelectItem>
                          <SelectItem value="Herault">Hérault</SelectItem>
                          <SelectItem value="Landes">Landes</SelectItem>
                          <SelectItem value="Lot">Lot</SelectItem>
                          <SelectItem value="Lot-et-Garonne">Lot-et-Garonne</SelectItem>
                          <SelectItem value="Pyrenees-Atlantiques">Pyrénées-Atlantiques</SelectItem>
                          <SelectItem value="Pyrenees-Orientales">Pyrénées-Orientales</SelectItem>
                          <SelectItem value="Tarn">Tarn</SelectItem>
                          <SelectItem value="Tarn-et-Garonne">Tarn-et-Garonne</SelectItem>
                          <SelectItem value="Var">Var</SelectItem>
                          <SelectItem value="Vaucluse">Vaucluse</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="pays"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Pays" {...field} disabled />
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
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 15 15" fill="none" className="text-gray-500" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                      </span> 
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
                  <button type="button" className={getButtonClass('Cérémonie')} onClick={() => handleButtonClick('Cérémonie')}>Cérémonie</button>
                  <button type="button" className={getButtonClass('Fête privée')} onClick={() => handleButtonClick('Fête privée')}>Fête privée</button>
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
              <svg width="28" height="28" className="text-white" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
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
                    <div className="flex items-center">
                      {isSending && ( // Check if sending
                        <div role="status" className="mr-2"> 
                          <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      )}
                      <h2 className="text-lg font-medium">{titleMessage}</h2> {/* Adjusted title message styling */}
                    </div>
                    <AlertDialogDescription>
                      {message}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setDialogOpen(false)} disabled={isSending}>Fermer</AlertDialogCancel>
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
