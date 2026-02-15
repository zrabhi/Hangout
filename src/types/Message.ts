export interface Message {
  contactId: number,
  body: string,
  date: number,
  type: "sent" | "inbox"
}