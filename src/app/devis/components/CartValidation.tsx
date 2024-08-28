// src/app/devis/components/CartValidation.tsx
import React from 'react';
import { createQuote } from "@/services/quotes";
import { Button } from '@/components/ui/button';

const CartValidation = ({ formData, cart, onPrevious }: { formData: any, cart: any, onPrevious: () => void }) => {
  const total = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  const handleSubmit = async () => {
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
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error creating quote:", error);
      // Handle error (e.g., show an error message)
    }
  };

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
        <div className="font-bold mt-2">
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