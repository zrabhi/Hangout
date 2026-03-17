import { tranlsationKeyType } from "@/context/AppSettingsContext";

interface OnBoardingDialogsType {
    title:tranlsationKeyType, 
    dialog: tranlsationKeyType,
    image: null
}

export const OnBoardingDialogs: OnBoardingDialogsType[] = [
  {
    title: "manageContactsTitle",
    dialog: "manageContactsDescription",
    image: null,
  },
  {
    title: "stayConnectedTitle",
    dialog: "stayConnectedDescription",
    image: null,
  },
  {
    title: "makeCallsTitle",
    dialog: "makeCallsDescription",
    image: null,
  },
];
