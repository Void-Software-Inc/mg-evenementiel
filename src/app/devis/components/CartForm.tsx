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


const formSchema = z.object({
  first_name: z.string().min(2, "Veuillez renseignez votre prénom").max(50, "Limite de 50 caractères dépassée"),
  last_name: z.string().min(2, "Veuillez renseignez votre nom").max(50, "Limite de 50 caractères dépassée"),
  email: z.string().email("Adresse email invalide"),
  phone_number: z.string().min(10, "Numéro de téléphone invalide").max(10, "Numéro de téléphone invalide").regex(/^\d{10}$/, "Le numéro de téléphone doit uniquement contenir des chiffres"),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }).refine(
    (data) => data.from !== undefined && data.to !== undefined,
    {
      message: "Veuillez sélectionner une date de début et de fin",
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
  const { formData, setFormData } = useDevis();

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
      date: { from: new Date(), to: new Date() }, // Initialize with current date
      is_traiteur: "false",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { date, ...restValues } = values;

    const quoteData = {
      ...restValues,
      event_start_date: date.from.toISOString(), // Use ISO format for consistency
      event_end_date: date.to.toISOString(), // Use ISO format for consistency
      is_traiteur: values.is_traiteur === "true", // Ensure this is set correctly
    };
    setFormData(quoteData); // Ensure this is correctly setting the formData
    onNext(quoteData);
  };

  return (
    <div className="w-full flex justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[90%] sm:w-[700px] pt-14">
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
            name="date"
            render={({ field }) => (
              <FormItem>
                <Label className="text-lg font-medium leading-loose text-gray-700">Date de l'événement *</Label>
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
                <FormMessage>
                  {form.formState.errors.description && "Veuillez sélectionner une date de début et de fin"}
                </FormMessage>
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