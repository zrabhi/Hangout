import { ExternalPathString, Href, RelativePathString } from "expo-router";

export const appRoutes : Record<string, RelativePathString | ExternalPathString > = {
    conversation:'/conv',
    inbox:'/messages',
    contacts:'/',
    contactDetails:'/contact',
    calls:'/calls'
}