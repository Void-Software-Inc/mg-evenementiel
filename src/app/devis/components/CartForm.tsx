"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateRange } from "react-day-picker";
import DatePickerWithRange from "@/components/ui/date-picker-range";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDevis } from '@/app/context/DevisContext';
import { ChevronRight, ChevronLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatInTimeZone } from 'date-fns-tz'

const formSchema = z.object({
  first_name: z.string().min(2, "Veuillez renseignez votre prénom").max(50, "Limite de 50 caractères dépassée"),
  last_name: z.string().min(2, "Veuillez renseignez votre nom").max(50, "Limite de 50 caractères dépassée"),
  email: z.string().email("Adresse email invalide"),
  phone_number: z.string().min(10, "Numéro de téléphone invalide").max(10, "Numéro de téléphone invalide").regex(/^\d{10}$/, "Le numéro de téléphone doit uniquement contenir des chiffres"),
  voie: z.string().min(2, "Veuillez renseigner votre adresse").max(100, "Limite de 100 caractères dépassée"),
  compl: z.string().max(100, "Limite de 100 caractères dépassée").optional(),
  cp: z.string().min(5, "Code postal invalide").max(5, "Code postal invalide").regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
  ville: z.string().min(2, "Veuillez renseigner votre ville").max(100, "Limite de 100 caractères dépassée"),
  depart: z.string().min(1, "Veuillez sélectionner un département"),
  pays: z.string().default("France"), 
  date: z.object({
    from: z.date({ required_error: "Veuillez sélectionner au moins une date" }),
    to: z.date().optional(),
  }).refine(
    (data) => data.from !== undefined,
    {
      message: "Veuillez sélectionner au moins une date",
    }
  ),
  is_traiteur: z.enum(["true", "false"], { required_error: "Veuillez sélectionner une option" }),
  description: z.string().min(2, "Veuillez écrire un message"),
});

interface CartFormProps {
  onNext: (data: any) => void;
  onPrevious: () => void;
}

const CartForm: React.FC<CartFormProps> = ({ onNext, onPrevious }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [titleMessage] = useState("");
  const [message] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const { formData, setFormData } = useDevis();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData ? {
      ...formData,
      date: {
        from: formData.event_start_date ? new Date(formData.event_start_date) : undefined,
        to: formData.event_end_date ? new Date(formData.event_end_date) : undefined
      },
      is_traiteur: formData.is_traiteur ? "true" : "false"
    } : {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      voie: "",
      compl: "",
      cp: "",
      ville: "",
      depart: "",
      pays: "France",  
      date: { from: new Date(), to: new Date() }, // Initialize with current date
      is_traiteur: "false",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { date, ...restValues } = values;
    
    // Create dates in French timezone
    const parisTimeZone = 'Europe/Paris';
    const startDate = date.from ? 
      formatInTimeZone(date.from, parisTimeZone, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : 
      undefined;
    const endDate = date.to ? 
      formatInTimeZone(date.to || date.from, parisTimeZone, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx") : 
      startDate;  // Use start date if no end date

    if (!startDate) {
      setFormError("Veuillez sélectionner une date");
      return;
    }

    const quoteData = {
      ...restValues,
      event_start_date: startDate,
      event_end_date: endDate,
      is_traiteur: values.is_traiteur === "true",
    };
    setFormData(quoteData);
    onNext(quoteData);
  };

  return (
    <div className="w-full flex justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, () => setFormError("Veuillez remplir tous les champs obligatoires"))} className="space-y-8 w-[90%] sm:w-[700px] pt-14">
          {formError && (
            <div className="p-4 mb-4 text-red-600 bg-red-100 rounded-lg">
              {formError}
            </div>
          )}
          
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <Label className="text-lg font-medium leading-loose text-gray-700">Prénom *</Label>
                <FormControl>
                  <Input className="w-full" placeholder="Votre prénom" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.first_name && "Veuillez renseignez votre prénom"}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <Label className="text-lg font-medium leading-loose text-gray-700">Nom *</Label>
                <FormControl>
                  <Input placeholder="Votre nom" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.last_name && "Veuillez renseignez votre nom"}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label className="text-lg font-medium leading-loose text-gray-700">Email *</Label>
                <FormControl>
                  <Input type="email" placeholder="Votre email" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email && "Adresse email invalide"}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <Label className="text-lg font-medium leading-loose text-gray-700">Téléphone *</Label>
                <FormControl>
                  <Input placeholder="Votre numéro de téléphone" {...field} />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.phone_number && "Numéro de téléphone invalide"}
                </FormMessage>
              </FormItem>
            )}
          />

              <FormField
                control={form.control}
                name="voie"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-lg font-medium leading-loose text-gray-700">Addresse *</Label>
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
                      <Input placeholder="France" {...field} disabled /> 
                    </FormControl>
                    <FormMessage className="text-left" />
                  </FormItem>
                )}
              />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <Label className="text-lg font-medium leading-loose text-gray-700">Date(s) de l'événement *</Label>
                <FormControl>
                  <DatePickerWithRange 
                    date={field.value as DateRange | undefined} 
                    setDate={(date) => {
                      // Ensure the date is set correctly
                      field.onChange(date);
                    }}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.date && "Veuillez sélectionner une date de début et de fin"}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_traiteur"
            render={({ field }) => (
              <FormItem>
                <Label className="text-lg font-medium leading-loose text-gray-700">
                  Souhaitez-vous ajouter l'option traiteur ? *
                </Label>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="mt-1 px-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="option-one" />
                    <Label className="text-base font-light text-gray-700" htmlFor="option-one">
                      Non
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="option-two" />
                    <Label className="text-base font-light text-gray-700" htmlFor="option-two">
                      Oui
                    </Label>
                  </div>
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Label className="text-lg font-medium leading-loose text-gray-700">
                  Dites-nous en plus sur votre projet *
                </Label>
                <FormControl>
                  <Textarea placeholder="Votre message..." {...field} />
                </FormControl>
                <FormMessage /> 
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
            <Button
              type="button"
              onClick={() => {
                onPrevious();
                window.scrollTo(0, 0);
              }}
              variant="outline"
              className=" bg-zinc-200 text-gray-700 h-[65px] w-full sm:h-[78px] sm:w-[170px] rounded-full border-none p-6 flex items-center space-x-4 transition-all duration-300 group"
            >
              <ChevronLeft className="min-w-6 min-h-6 text-gray-800 transition-transform duration-300 space-x-4  group-hover:-translate-x-2" />
              <span className='font-semibold text-gray-800 text-xl'>Précédent</span>
            </Button>

            <Button
              type="submit"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="h-[65px] w-full sm:h-[78px] sm:w-[170px] rounded-full p-6 flex items-center space-x-4 transition-all duration-300 group"
            >
              <span className='font-semibold text-xl'>Suivant</span>
              <ChevronRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-2" />
            </Button>
          </div>
        </form>
      </Form>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{titleMessage}</AlertDialogTitle>
            <AlertDialogDescription>{message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialogOpen(false)}>Fermer</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CartForm;