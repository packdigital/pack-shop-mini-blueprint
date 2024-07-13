export type Data = {data: Record<string, any>[]; errors: Record<string, any>[]};

export interface ActionProps {
  body: FormData;
  privateApiKey: string;
  publicApiKey?: string;
  apiVersion: string;
}

export interface SubscribeToBackInStockReturn {
  email: string | null;
  status: number;
  message: string;
  error: string | null;
  submittedAt: string;
}
