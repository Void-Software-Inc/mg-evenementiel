"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useCart } from '@/app/context/CartContext';
import { useDevis } from '@/app/context/DevisContext';
import { ChevronRight, ChevronLeft, Info } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
      { name: 'delivery', price: 0, enabled: false, description: '' },
      { name: 'pickup', price: 0, enabled: false, description: '' },
      { name: 'table_service', price: 0, enabled: false, description: '' },
      { name: 'marquee_setup', price: 0, enabled: false, description: '' },
      { name: 'marquee_dismantling', price: 0, enabled: false, description: '' },
      { name: 'decoration', price: 0, enabled: false, description: '' }
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
    
    // Scroll to top of the page
    window.scrollTo(0, 0);
    
    // Pass the fees to the next component
    onNext({
      fees: updatedFees
    });
  };

  return (
    <div className="w-full">
      <div className="bg-white p-6  max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Options supplémentaires</h2>
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:bg-transparent"
                >
                  <Info className="h-4 w-4 text-gray-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                className="max-w-xs p-4 bg-white border border-gray-200 shadow-md"
                sideOffset={5}
              >
                <p className="text-sm text-gray-600">
                  Les prix des options seront calculés après discussion avec notre équipe. 
                  Ces options peuvent être modifiées, ajoutées ou supprimées à tout moment selon vos besoins.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* No items message */}
        {!hasDecoration && !hasBarnum && !hasTraiteur && (
          <div className="text-center py-8 bg-gray-50 rounded-lg mb-6">
            <p className="text-gray-500">Aucune option disponible pour les articles sélectionnés.</p>
          </div>
        )}

        <div className="space-y-6">
          {/* General options (shown when either decoration or barnum is present) */}
          {(hasDecoration || hasBarnum) && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">Options générales</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
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
                
                <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
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
              </div>
            </div>
          )}

          {/* Barnum specific options */}
          {hasBarnum && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">Options de barnum</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
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
                
                <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
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

           {/* Decoration specific options */}
           {hasDecoration && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">Options de décoration</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
                  <Checkbox 
                    id="decoration" 
                    checked={fees.find(fee => fee.name === 'decoration')?.enabled}
                    onCheckedChange={() => toggleFee('decoration')}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="decoration" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Mise en place de la décoration
                    </Label>
                    <p className="text-xs text-gray-500">Installation par nos équipes de la décoration sur le lieu de l'événement</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Traiteur options */}
          {hasTraiteur && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">Options de traiteur</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100">
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
        </div>

        {/* Keep existing buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
          <Button
            type="button"
            onClick={() => {
              onPrevious();
              window.scrollTo(0, 0);
            }}
            variant="outline"
            className="bg-zinc-200 text-gray-700 h-[65px] w-full sm:h-[78px] sm:w-[170px] rounded-full border-none p-6 flex items-center space-x-4 transition-all duration-300 group"
          >
            <ChevronLeft className="min-w-6 min-h-6 text-gray-800 transition-transform duration-300 space-x-4 group-hover:-translate-x-2" />
            <span className='font-semibold text-gray-800 text-xl'>Précédent</span>
          </Button>

          <Button
            type="submit"
            onClick={handleNext}
            className="h-[65px] w-full sm:h-[78px] sm:w-[170px] rounded-full p-6 flex items-center space-x-4 transition-all duration-300 group"
          >
            <span className='font-semibold text-xl'>Suivant</span>
            <ChevronRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartOptions;