import { Quote, QuoteItem } from "@/utils/types/quotes";

const API_URL = '/api';

/***************************** Quotes *****************************/

export async function createQuote(quoteData: Partial<Quote>, quoteItems?: QuoteItem[]): Promise<{ quote: Quote; quoteItems?: QuoteItem[] }> {
    try {
      const url = `${API_URL}/quotes/create`;
      const cleanedQuoteItems = quoteItems?.map(({ id, quote_id, ...item }) => item);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quoteData, quoteItems: cleanedQuoteItems }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create quote');
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating quote:', error);
      throw error;
    }
}