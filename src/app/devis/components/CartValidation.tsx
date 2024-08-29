'use client'

import React, { useState } from 'react';
import { createQuote } from "@/services/quotes";
import { Button } from '@/components/ui/button';
import { useDevis } from '@/app/context/DevisContext';
import { useCart } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';

const CartValidation = ({ formData, cart, onPrevious }: { formData: any, cart: any, onPrevious: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(null);
  const total = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const { clearFormData } = useDevis();
  const { clearCart } = useCart();
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const quoteData = {
      ...formData,
      total_cost: total,
      status: "nouveau",
      is_paid: false,
      traiteur_price: 0,
      other_expenses: 0,
    };

    const quoteItems = cart.map((item: any) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    try {
      const result = await createQuote(quoteData, quoteItems);
      console.log("Quote created:", result);
      clearFormData();
      clearCart();
      setSubmitResult('success');
    } catch (error) {
      console.error("Error creating quote:", error);
      setSubmitResult('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitResult === 'success') {
    return (
      <div className="w-full max-w-2xl mx-auto text-center flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Devis envoyé avec succès!</h2>
        <p className="mb-4">Merci pour votre demande. Nous vous contacterons bientôt.</p>
        <Button onClick={() => router.push('/')} className="px-4 py-2 bg-black text-white rounded-full">
          Retour à l'accueil
        </Button>
      </div>
    );
  }

  if (submitResult === 'error') {
    return (
      <div className="w-full max-w-2xl mx-auto text-center flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Erreur lors de l'envoi du devis</h2>
        <p className="mb-4">Désolé, une erreur s'est produite. Veuillez réessayer plus tard.</p>
        <Button onClick={() => setSubmitResult(null)} className="px-4 py-2 bg-black text-white rounded-full">
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Récapitulatif de votre devis</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Informations personnelles</h3>
        <p>Nom: {formData.last_name}</p>
        <p>Prénom: {formData.first_name}</p>
        <p>Email: {formData.email}</p>
        <p>Téléphone: {formData.phone_number}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Produits</h3>
        {cart.map((item: any) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>{(item.price * item.quantity).toFixed(2)}€</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-2">
          <span>Total:</span>
          <span>{total.toFixed(2)}€</span>
        </div>
      </div>
      <div className="flex justify-between mt-4">
				<Button
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
					onClick={handleSubmit}
					className="px-4 py-2 bg-black text-white rounded-full"
				>
					Confirmer et envoyer le devis
				</Button>
			</div>
    </div>
  );
};

export default CartValidation;