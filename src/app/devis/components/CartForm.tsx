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
    from: z.date().optional(),
    to: z.date().optional(),
  }).optional(),
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      date: undefined,
      is_traiteur: "false",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { date, ...restValues } = values;
    const parisTimeZone = 'Europe/Paris';
  
    const formatDateToParisTime = (date: Date | undefined) => {
      if (!date) return null;
      return date.toLocaleString('en-US', { timeZone: parisTimeZone, hour12: false }).replace(',', '');
    };
  
    const quoteData = {
      ...restValues,
      event_start_date: formatDateToParisTime(date?.from) || "",
      event_end_date: formatDateToParisTime(date?.to) || "",
      is_traiteur: values.is_traiteur === "true",
    };
  
    onNext(quoteData);
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <Label className="text-lg font-medium leading-loose text-gray-700">Prénom *</Label>
                <FormControl>
                  <Input className="w-full" placeholder="Votre prénom" {...field} />
                </FormControl>
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <Label className="text-lg font-medium leading-loose text-gray-700">Date de l'événement</Label>
                <FormControl>
                  <DatePickerWithRange date={field.value as DateRange} setDate={(date) => field.onChange(date as DateRange)} />
                </FormControl>
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

          <div className="flex flex-col gap-4 mt-4">
            <Button
              type="button"
              onClick={() => {
                onPrevious();
                window.scrollTo(0, 0);
              }}
              variant="outline"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full"
            >
              Précédent
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-full"
            >
              Suivant
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