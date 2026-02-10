
export  interface Contact {
    contactType: string;
    firstName: string;
    id: string;
    image: {
        uri: string;
    } | null;
    imageAvailable: boolean;
    isFavorite: boolean;
    lastName: string;
    lookupKey: string;
    name: string;
    phoneNumbers?: {
        id: string;
        label: string;
        number: string;
        type: number;
    }[];
}