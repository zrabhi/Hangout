export interface Contact {
  id?:string
  firstName: string | null;
  lastName: string | null;
  address: string | null;
  postalCode: string | null;
  email: string | null;
  image: string | null;
}

export const contactCreationInit: Contact = {
  firstName: null,
  lastName: null,
  address: null,
  postalCode: null,
  email: null,
  image: null,
};
