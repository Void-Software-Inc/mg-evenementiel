"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useCart } from '@/app/context/CartContext';
import { useDevis } from '@/app/context/DevisContext';
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CartOptionsProps {
  onNext: (data: any) => void;
  onPrevious: () => void;
}

interface FormData {
  fees: Array<{
    name: string;
    price: number;
    enabled: boolean;
    description: string;
  }>;
  [key: string]: any;
}

const CartOptions: React.FC<CartOptionsProps> = ({ onNext, onPrevious }) => {
  const { cart } = useCart();
  const { formData, setFormData } = useDevis();
  
  // Initialize fees from formData or with default values
  const [fees, setFees] = useState<any[]>(() => {
    console.log('Initializing fees with formData:', formData?.fees);
    if (formData?.fees && formData.fees.length > 0) {
      return formData.fees.map((fee: any) => ({
        ...fee,
        enabled: fee.enabled || false
      }));
    }
    return [
      { name: 'delivery', price: 50, enabled: false, description: 'Livraison' },
      { name: 'pickup', price: 50, enabled: false, description: 'Frais d\'enlèvement du matériel' },
      { name: 'table_service', price: 150, enabled: false, description: 'Service à table' },
      { name: 'retrieval', price: 100, enabled: false, description: 'Mise en place de la décoration' },
      { name: 'marquee_setup', price: 200, enabled: false, description: 'Mise en place et construction du barnum' },
      { name: 'marquee_dismantling', price: 150, enabled: false, description: 'Démontage du barnum' },
      { name: 'decoration', price: 100, enabled: false, description: 'Installation décoration' }
    ];
  });

  // Update fees when formData changes
  useEffect(() => {
    console.log('formData.fees changed:', formData?.fees);
    if (formData?.fees) {
      setFees(formData.fees.map((fee: any) => ({
        ...fee,
        enabled: fee.enabled || false
      })));
    }
  }, [formData?.fees]);

  // Detect if specific item types exist in cart
  const hasDecoration = cart.some(item => item.category === 'decoration' && !item.type?.includes('chapiteau'));
  const hasBarnum = cart.some(item => item.type?.includes('chapiteau'));
  const hasTraiteur = cart.some(item => item.category === 'traiteur');

  // Toggle fee selection
  const toggleFee = (feeName: string) => {
    console.log('Toggling fee:', feeName);
    setFees(prevFees => {
      const updatedFees = prevFees.map(fee => 
        fee.name === feeName ? { ...fee, enabled: !fee.enabled } : fee
      );
      
      // Update formData in context
      setFormData((prev: FormData) => {
        const newFormData = {
          ...prev,
          fees: updatedFees
        };
        return newFormData;
      });
      
      return updatedFees;
    });
  };

  // Handle next step
  const handleNext = () => {
    // Create a copy of the fees to ensure it's not mutated
    const updatedFees = [...fees];
    
    // Update form data with fees
    setFormData((prev: FormData) => {
      const newFormData = {
        ...prev,
        fees: updatedFees
      };
      return newFormData;
    });
    
    // Pass the fees to the next component
    onNext({
      fees: updatedFees
    });
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Options supplémentaires</h2>
        
        {/* No items message */}
        {!hasDecoration && !hasBarnum && !hasTraiteur && (
          <div className="text-center py-8 bg-gray-50 rounded-lg mb-6">
            <p className="text-gray-500">Aucune option disponible pour les articles sélectionnés.</p>
          </div>
        )}

        {/* Decoration options */}
        {hasDecoration && (
          <div className="mb-8">
            <h3 className="font-medium text-gray-800 mb-3 pb-2 border-b">Options de décoration</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="delivery" 
                  checked={fees.find(fee => fee.name === 'delivery')?.enabled}
                  onCheckedChange={() => toggleFee('delivery')}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="delivery" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Livraison
                  </Label>
                  <p className="text-xs text-gray-500">Livraison du matériel à votre adresse</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="pickup" 
                  checked={fees.find(fee => fee.name === 'pickup')?.enabled}
                  onCheckedChange={() => toggleFee('pickup')}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="pickup" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Frais d'enlèvement du matériel
                  </Label>
                  <p className="text-xs text-gray-500">Nous récupérons le matériel après votre événement</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="retrieval" 
                  checked={fees.find(fee => fee.name === 'retrieval')?.enabled}
                  onCheckedChange={() => toggleFee('retrieval')}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="retrieval" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Mise en place de la décoration
                  </Label>
                  <p className="text-xs text-gray-500">Installation par nos équipes de la décoration sur le lieu de l'événement</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Barnum options */}
        {hasBarnum && (
          <div className="mb-8">
            <h3 className="font-medium text-gray-800 mb-3 pb-2 border-b">Options de barnum</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="marquee_setup" 
                  checked={fees.find(fee => fee.name === 'marquee_setup')?.enabled}
                  onCheckedChange={() => toggleFee('marquee_setup')}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="marquee_setup" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Mise en place et construction du barnum
                  </Label>
                  <p className="text-xs text-gray-500">Installation complète du barnum par nos équipes</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="marquee_dismantling" 
                  checked={fees.find(fee => fee.name === 'marquee_dismantling')?.enabled}
                  onCheckedChange={() => toggleFee('marquee_dismantling')}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="marquee_dismantling" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Démontage du barnum
                  </Label>
                  <p className="text-xs text-gray-500">Démontage et enlèvement du barnum après votre événement</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Traiteur options */}
        {hasTraiteur && (
          <div className="mb-8">
            <h3 className="font-medium text-gray-800 mb-3 pb-2 border-b">Options de traiteur</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="table_service" 
                  checked={fees.find(fee => fee.name === 'table_service')?.enabled}
                  onCheckedChange={() => toggleFee('table_service')}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="table_service" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Service à table
                  </Label>
                  <p className="text-xs text-gray-500">Service à table par notre personnel</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={onPrevious}
            className="flex items-center"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Retour
          </Button>
          <Button onClick={handleNext} className="flex items-center">
            Continuer <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartOptions;