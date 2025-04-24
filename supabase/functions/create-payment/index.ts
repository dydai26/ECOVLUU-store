import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

/** 
 * ЗАУВАЖЕННЯ ЩОДО ПОМИЛОК ТИПІЗАЦІЇ:
 * Помилки типу "Cannot find module" в цьому файлі нормальні для середовища VS Code, 
 * але код буде працювати коректно в Deno і Supabase Functions.
 * Ці помилки можна ігнорувати - вони з'являються через різницю між середовищами Node.js та Deno.
 */

// Додаємо декларацію типу для Deno
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { paymentMethodId, amount, currency = "eur", metadata = {} } = await req.json();
    
    console.log("Payment request received:", { paymentMethodId, amount, currency, metadata });

    // Initialize Stripe with the secret key from Edge Function secrets
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16" as any, // використовуємо as any для уникнення типізації
    });
    
    console.log("Stripe initialized, creating payment intent...");

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe expects amount in cents
        currency,
        payment_method: paymentMethodId,
        metadata,
        confirm: true,
        description: "Payment from EcoVoula shop",
        return_url: new URL(req.url).origin + "/order-success",
      });
      
      console.log("Payment intent created successfully:", paymentIntent.id);

      return new Response(JSON.stringify({
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: amount,
        currency: currency,
        metadata
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } catch (stripeError) {
      console.error("Stripe error details:", JSON.stringify(stripeError));
      throw stripeError;
    }

  } catch (error) {
    console.error("Error creating payment:", error);
    console.error("Error object details:", JSON.stringify(error, null, 2));
    
    return new Response(JSON.stringify({ 
      error: error.message, 
      details: error.type || "unknown_error",
      code: error.code || "unknown_code"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
