import { CodePromo } from "@/utils/types/codesPromos";

const API_URL = '/api';

/********************* CODES PROMOS *********************/
  
export async function getCodesPromos(): Promise<CodePromo[]> {
  try {
    const url = `${API_URL}/codesPromos`
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch codes promos');
    }
    const { codesPromos } = await response.json();
    return codesPromos;
  } catch (error) {
    console.error('Error fetching codes promos:', error);
    throw error;
  }
}
