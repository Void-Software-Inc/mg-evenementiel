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
import { useCart } from '@/app/context/CartContext';
import { createQuote } from "@/services/quotes";
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
  event_start_date: z.date(),
  event_end_date: z.date(),
  is_traiteur: z.enum(["true", "false"], { required_error: "Veuillez sélectionner une option" }),
  description: z.string().min(2, "Veuillez écrire un message"),
});

const CartForm = () => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const { cart } = useCart();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [titleMessage, setTitleMessage] = useState("");
  const [message, setMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      event_start_date: new Date(),
      event_end_date: new Date(),
      is_traiteur: "false",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const quoteData = {
      ...values,
      event_start_date: values.event_start_date.toISOString(),
      event_end_date: values.event_end_date.toISOString(),
      is_traiteur: values.is_traiteur === "true",
      total_cost: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    const quoteItems = cart.map(item => ({
      id: item.id,
      quote_id: item.id,
      product_id: item.id,
      quantity: item.quantity,
    }));

    try {
      const result = await createQuote(quoteData, quoteItems);
      console.log("Quote created:", result);
      setTitleMessage("Devis créé avec succès");
      setMessage("Votre devis a été créé et enregistré. Nous vous contacterons bientôt.");
      setDialogOpen(true);
    } catch (error) {
      console.error("Error creating quote:", error);
      setTitleMessage("Erreur");
      setMessage("Une erreur s'est produite lors de la création du devis. Veuillez réessayer.");
      setDialogOpen(true);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <Label className="text-lg font-medium leading-loose text-gray-700">Prénom *</Label>
                <FormControl>
                  <Input placeholder="Votre prénom" {...field} />
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

          <div>
            <Label className="text-lg font-medium leading-loose text-gray-700">Date de l'événement</Label>
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>

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

          <div className="w-full h-fit flex justify-end">
            <Button type="submit" className="rounded-full h-[65px] w-full sm:h-[78px] sm:w-[170px] py-6 px-12 flex items-center group ease-in-out transition duration-300 hover:bg-neutral-500">
              <span className="font-semibold text-xl">Envoyer</span>
              <span className="ml-2 transition-transform transform group-hover:translate-x-2 duration-300">
                <svg width="28" height="28" className="text-white" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              </span>
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