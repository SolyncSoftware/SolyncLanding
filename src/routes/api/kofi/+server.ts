import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
interface KofiTransaction {
  timestamp: string;
  type: string;
  is_public: boolean;
  from_name: string;
  message: string;
  amount: string;
  url: string;
  email: string;
  currency: string;
  is_subscription_payment: boolean;
  is_first_subscription_payment: boolean;
  kofi_transaction_id: string;
  verification_token: string;
  shop_items: string[] | null;
  tier_name: string | null;
};
export const POST: RequestHandler = async (result) => {
  try {
  const data: KofiTransaction = await result.request.json();
  return json(data)
  }
  catch(e){
    const message = "failure, ${e}";
    return json({
      message: message
    })
  }
  
};