export interface OrderFormValues {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  occasion: string;
  cakeType: string;
  cakeSize: string;
  servings: string;
  flavor: string;
  designNotes: string;
  budget: string;
  fulfillmentType: 'pickup' | 'delivery' | '';
  allergies: string;
  referenceUrlsText: string;
  consent: boolean;
  website: string;
}

export type OrderFormErrors = Partial<Record<keyof OrderFormValues | 'referenceUrls', string>>;

export interface OrderApiSuccess {
  ok: true;
  requestId: string;
  message: string;
}

export interface OrderApiError {
  ok: false;
  code: string;
  message: string;
  fieldErrors?: Record<string, string>;
}

export type OrderApiResponse = OrderApiSuccess | OrderApiError;