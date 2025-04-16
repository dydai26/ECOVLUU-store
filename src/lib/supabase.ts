
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://inivoiunisrgdinrcquu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluaXZvaXVuaXNyZ2RpbnJjcXV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNzY0OTgsImV4cCI6MjA1OTg1MjQ5OH0.Ruox-xcKxcirSSmTsNHpPIXqUyFCApZOisJViI_Hp1w';

export const supabase = createClient(supabaseUrl, supabaseKey);

// SQL query to create reviews table:
/*
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  date TEXT
);
*/

// UPS API credentials
const UPS_CLIENT_ID = '9X8eEjrWfwfIBZyr0H4T8ZhXGcSwXHzCJNvE0bdFPISoFMxu';
const UPS_CLIENT_SECRET = 'TPG00XQHHbKCZpoBXGrcHCNmSvAuRJFOPPDfoylgdftWt7mR4jxPDTRB9jVyxS8i';

// Типи для інтеграції з UPS
export interface UPSAddress {
  addressLine: string;
  city: string;
  postalCode: string;
  countryCode: string;
  stateProvinceCode?: string;
}

export interface UPSShippingRate {
  serviceCode: string;
  serviceName: string;
  totalPrice: number;
  currency: string;
  deliveryTimeEstimate: string;
}

// Функція для отримання токену доступу UPS API
const getUPSAccessToken = async (): Promise<string> => {
  try {
    const response = await fetch('https://www.ups.com/security/oAuth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${UPS_CLIENT_ID}:${UPS_CLIENT_SECRET}`)}`,
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    
    if (data.access_token) {
      return data.access_token;
    } else {
      throw new Error('Access token not received');
    }
  } catch (error) {
    console.error('Error getting UPS access token:', error);
    throw error;
  }
};

/**
 * Валідація та пошук адреси через UPS API
 */
export const validateUPSAddress = async (address: UPSAddress): Promise<UPSAddress[]> => {
  try {
    const accessToken = await getUPSAccessToken();
    
    const response = await fetch('https://www.ups.com/rest/AddressValidation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        address: {
          line1: address.addressLine,
          city: address.city,
          postalCode: address.postalCode,
          country: address.countryCode,
          stateProvinceCode: address.stateProvinceCode,
        }
      })
    });

    const data = await response.json();
    return data.validAddresses || []; // Повертаємо валідовані адреси
  } catch (error) {
    console.error('Error validating UPS address:', error);
    throw error;
  }
};

/**
 * Отримання доступних тарифів доставки від UPS
 */
export const getUPSShippingRates = async (
  fromAddress: UPSAddress,
  toAddress: UPSAddress,
  packageWeight: number,
  packageDimensions?: { length: number; width: number; height: number }
): Promise<UPSShippingRate[]> => {
  try {
    const accessToken = await getUPSAccessToken();
    
    const response = await fetch('https://www.ups.com/rest/Rate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        shipment: {
          shipper: {
            address: fromAddress,
          },
          recipient: {
            address: toAddress,
          },
          package: {
            weight: packageWeight,
            dimensions: packageDimensions,
          }
        }
      })
    });

    const data = await response.json();
    
    // Тут ви отримаєте тарифи, обробляйте їх відповідно до структури відповіді UPS
    return data.rates.map((rate: any) => ({
      serviceCode: rate.serviceCode,
      serviceName: rate.serviceName,
      totalPrice: rate.totalPrice,
      currency: rate.currency,
      deliveryTimeEstimate: rate.deliveryTimeEstimate,
    }));
  } catch (error) {
    console.error('Error getting UPS shipping rates:', error);
    throw error;
  }
};
