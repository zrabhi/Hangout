export interface SmsResult {
  success: boolean;
  error?: string;
}



export interface SmsMessage {
  _id: string;
  address: string;
  body: string;
  date: string;
  type: string;
}