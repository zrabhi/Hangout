export interface Contact {
  id : number | null
  firstName: string | null;
  lastName: string | null;
  address: string | null;
  homeAddress: string | null;
  postalCode: string | null;
  email: string | null;
  image: string | null;
}
export interface ContactCreation extends Omit<Contact, "id"> {

}

export const contactCreationInit: ContactCreation = {
  firstName: null,
  lastName: null,
  address: null,
  homeAddress: null,
  postalCode: null,
  email: null,
  image: null,
};
