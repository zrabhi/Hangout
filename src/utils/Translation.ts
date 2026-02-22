export const translations = {
  en: {
    createContact: "Create Contact",
    delete: "Delete",
    changePhoto: "Change photo",
    firstName: "First Name",
    inputPlaceHolder: "Enter your ",
    lastName: "Last Name",
    email: "Email",
    postalCode: "Postal Code",
    photo: "Photo",
    photoUpload: "Upload photo",
    phoneNumber: "Phone Number",
    create: "Create",
    cancel: "Cancel",
    update: "Update",
    apply: "Apply",
    search: "Search",
    allContacts: "All Contacts",
    favorites: "Favorites",
    language: "Language",
    headerColor: "Header Color",
    emptyContactsMessage:
      "Sadly, your contact list is empty. Add a new contact or sync with your phone to get started!",

    // permissions
    photoPermission:
      "Sadly, we don’t have access to your photos. To upload an image, please go to settings and allow permission.",
    smsReadPermission:
  "Hangouts needs permission to read your SMS messages to detect and process relevant conversations inside the app.",

  smsSendPermission:
    "Hangouts requires permission to send SMS messages so you can communicate with your contacts directly from the app.",

  callPhonePermission:
    "Hangouts needs phone call permission to allow you to initiate calls directly from the app.",

  smsReceivePermission:
    "Hangouts requires permission to receive SMS messages to stay updated with incoming conversations.",




    // Errors
    firstNameRequired: "First name is required",
    firstNameTooShort: "First name must be at least 2 characters",
    lastNameRequired: "Last name is required",
    lastNameTooShort: "Last name must be at least 2 characters",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    phoneNumberRequired: "Phone number is required",
    phoneNumberInvalid: "Please enter a valid phone number",
    postalCodeRequired: "Postal code is required",
    postalCodeInvalid: "Please enter a valid postal code",

    inbox: "Inbox",
    calls: "Calls",
  },

  fr: {
    changePhoto: "Changer la photo",
    createContact: "Créer un contact",
    delete: "Supprimer",
    phoneNumber: "numéro de thélephone",
    firstName: "Prénom",
    inputPlaceHolder: "Entrez votre ",
    lastName: "Nom",
    email: "Email",
    postalCode: "Code postal",
    photo: "Photo",
    photoUpload: "Télécharger une photo",
    create: "Créer",
    cancel: "Annuler",
    update: "Mettre à jour",
    apply: "Appliquer",
    search: "Rechercher",
    allContacts: "Tous les contacts",
    favorites: "Favoris",
    language: "Langue",
    headerColor: "Couleur de l'en-tête",
    // errors

    emptyContactsMessage:
      "Malheureusement, votre liste de contacts est vide. Ajoutez un nouveau contact ou synchronisez avec votre téléphone pour commencer !",
    firstNameRequired: "Le prénom est obligatoire",
    firstNameTooShort: "Le prénom doit contenir au moins 2 caractères",
    lastNameRequired: "Le nom est obligatoire",
    lastNameTooShort: "Le nom doit contenir au moins 2 caractères",
    emailRequired: "L'email est obligatoire",
    emailInvalid: "Veuillez saisir une adresse email valide",
    phoneNumberRequired: "Le numéro de téléphone est obligatoire",
    phoneNumberInvalid: "Veuillez saisir un numéro de téléphone valide",
    postalCodeRequired: "Le code postal est obligatoire",
    postalCodeInvalid: "Veuillez saisir un code postal valide",
    inbox: "Boîte de réception",
    calls: "Appels",


    smsReadPermission:
  "Hangouts a besoin de l'autorisation de lire vos SMS afin de détecter et traiter les conversations pertinentes dans l'application.",

smsSendPermission:
  "Hangouts nécessite l'autorisation d'envoyer des SMS afin que vous puissiez communiquer avec vos contacts directement depuis l'application.",

callPhonePermission:
  "Hangouts a besoin de l'autorisation d'effectuer des appels téléphoniques afin de vous permettre d'initier des appels directement depuis l'application.",

smsReceivePermission:
  "Hangouts nécessite l'autorisation de recevoir des SMS afin de rester informé des conversations entrantes.",
  },
};

export type Language = "en" | "fr";
