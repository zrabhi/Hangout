import { type MessageType } from "./MessageTYpe";

export enum DeleviryStateType  { 
  "SENT", 
  "FAILED",
  "SENDING",
  "DELIVERED"
}
export interface Message {
  address:string;
  contactId:number,
  body: string,
  date: number,
  type: MessageType;
  deleviryState:  DeleviryStateType
}

export interface Inbox extends Message {
  firstName: string,
  lastName: string, 
  image: string | null
} 
export interface Sms {
  _id: string;
  address: string;
  body: string;
  date: string;
  type: string;
  deleviryState: DeleviryStateType
}