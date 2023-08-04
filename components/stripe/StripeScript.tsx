import { loadStripe } from "@stripe/stripe-js/pure";

export const stripePromise = async () => {
  // console.log("*************************");
  // console.log("TRY LOAD STRIPE");
  // console.log("*************************");
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
  return stripe;
};
