# Hangouts

A mobile messaging and contact management application built with **React Native**, featuring custom **Android Native Modules** for SMS, incoming message listening, phone calls, and contact management.  
The application uses a **local NoSQL database** to store messages, contacts, and conversations.


https://github.com/user-attachments/assets/8a098ce3-ef05-4db3-a157-94409bfcab73


---

## Overview

Hangouts is a React Native mobile application designed to provide a messaging-like experience with deep Android integration.

The project combines a modern React Native interface with custom native Android modules that allow the app to interact directly with device capabilities such as SMS, phone calls, and contacts.

The application also uses a **NoSQL local database** to store conversations, contacts, and messages efficiently, allowing flexible data structures and fast local access.

---

## Features

### Messaging
- Send SMS messages directly from the application
- Listen for **incoming SMS messages in real time**
- Display conversation history
- Organize conversations by contact or phone number
- Store messages locally using a **NoSQL database**

### Contacts
- Create new contacts
- Update existing contacts
- Delete contacts
- Automatically create a contact when receiving a message from an unknown number

### Calling
- Initiate phone calls directly from the application
- Native Android integration for call functionality

### Native Android Modules
Custom native modules were implemented to extend React Native capabilities and bridge Android APIs to the JavaScript layer.

These modules handle:
- SMS sending
- Incoming SMS listening
- Contacts access and management
- Phone calls
- Other device-level interactions

---

## Local Data Persistence

The application uses a **local NoSQL database** to store and manage application data.

Stored data includes:
- Contacts
- Messages
- Conversations
- Application state

This approach allows flexible schema design and efficient local storage for messaging features.


## Native Module Integration

One of the main goals of this project was to integrate **native Android functionality** into a React Native application.

Custom native modules expose Android APIs to the JavaScript layer, enabling the app to:

- Send SMS messages
- Listen for incoming SMS in real time
- Access and manage contacts
- Initiate phone calls

This approach combines the **flexibility of React Native** with the **power of native Android APIs**.

---

## Permissions

The application requires the following Android permissions:

- `READ_SMS`
- `SEND_SMS`
- `RECEIVE_SMS`
- `READ_CONTACTS`
- `CALL_PHONE`

## Future Improvements

Possible future improvements for the project:

- Add message search
- Support multimedia messages
- Add message delivery and read status
- Improve conversation grouping
- Improve UI animations

<img width="1170" height="2532" alt="Simulator Screenshot - iPhone 16e - 2026-03-05 at 01 52 59" src="https://github.com/user-attachments/assets/4ccc201c-1f5b-4ca3-b012-f8100f1f7184" />
<img width="1170" height="2532" alt="Simulator Screenshot - iPhone 16e - 2026-03-05 at 01 53 03" src="https://github.com/user-attachments/assets/766bb589-4606-4fc6-8cdc-bf1322a6a936" />
<img width="1170" height="2532" alt="Simulator Screenshot - iPhone 16e - 2026-03-05 at 01 53 09" src="https://github.com/user-attachments/assets/f2d8b5be-d51b-4ed7-80a2-bfb403a62306" />
