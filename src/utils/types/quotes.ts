export type Quote = {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    event_start_date: string;
    event_end_date: string;
    status: string;
    total_cost: number;
    is_paid: boolean;
    is_traiteur: boolean;
    traiteur_price: number;
    other_expenses: number;
    created_at: string;
    last_update: string;
    description: string;
  };

  export type QuoteItem = {
    id: number;
    quote_id: number;
    product_id: number;
    quantity: number;
  };