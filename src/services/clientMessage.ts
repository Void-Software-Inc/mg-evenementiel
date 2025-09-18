import { ClientMessage } from "@/utils/types/clientMessage";

const API_URL = '/api';

/********************* CLIENT MESSAGES *********************/
  
export async function getClientMessages(): Promise<ClientMessage[]> {
  try {
    const url = `${API_URL}/clientMessage`
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch client messages');
    }
    const { clientMessages } = await response.json();
    return clientMessages;
  } catch (error) {
    console.error('Error fetching client messages:', error);
    throw error;
  }
}