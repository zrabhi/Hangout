import { type MessageType } from "./MessageTYpe";

export enum DeleviryStateType  { 
  "SENT", 
  "FAILED",
  "SENDING"
}
export interface Message {
  address:string;
  contactId:number,
  body: string,
  date: number,
  type: MessageType;
  deleviryState:  DeleviryStateType
}

export interface Sms {
  _id: string;
  address: string;
  body: string;
  date: string;
  type: string;
  deleviryState: DeleviryStateType
}