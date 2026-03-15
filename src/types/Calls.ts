export interface Calls {
    id?:number,
    address:string,
    contactId:number,
    timestamp:number
}

export interface CallsSummary extends Calls {
  firstName: string,
  lastName: string, 
  image: string | null
}