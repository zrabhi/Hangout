/* eslint-disable */
import { type Contact } from "@/types/Contacts";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSQLiteContext } from "expo-sqlite";
import { type Message } from "@/types/Message";
import { type Calls } from "@/types/Calls";
interface DataBaseContextType {
  contacts: Contact[];

  isLoading: boolean;
  createContact: (contact: Contact) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  getConatctsList: () => Promise<Contact[]>;
  getContactById: (id: string) => Promise<Contact | null>;
  getConversationByaddress: (address: number) => Promise<Message[]>;
  addMessage: (message: Message) => Promise<void>;
  handleGetCallsList: () => Promise<Calls[]>;
  getLatestMessages: () => Promise<Message[]>;
  handleAddCall: (call: Calls) => Promise<void>;
  updateContact: (
    id: string,
    fields: Partial<Omit<Contact, "id">>,
  ) => Promise<void>;
  onInitDb: () => Promise<void>;
}

const DataBaseContext = createContext<DataBaseContextType | null>(null);

export const DataBaseProvider = ({ children }: { children: ReactNode }) => {
  const db = useSQLiteContext();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const handleInitDataBase = async () => {
    setIsloading(true);
    try {
      await db.execAsync(`PRAGMA foreign_keys = ON;`);
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS contacts  (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          firstName TEXT NOT null,
          lastName TEXT NOT null,
          address TEXT,
          postalCode TEXT,
          email TEXT,
          image TEXT
          );
          `);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          address TEXT,
          contactId INTEGER,
          body TEXT,
          date INTEGER,
          type TEXT,
          deleviryState TEXT,
          FOREIGN KEY (contactId) REFERENCES contacts(id)
          );
          `);

      await db.execAsync(`
          CREATE TABLE IF NOT EXISTS calls (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          address TEXT NOT NULL,
          contactId INTEGER,
          contactName TEXT,
          timestamp TEXT NOT NULL,
          FOREIGN KEY(contactId) REFERENCES contacts(id)
          );
          `);
    } catch (err) {
      throw new Error(`ERROR occured while Init DB ${err}`);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    handleInitDataBase();
  }, []);

  const getConversationByaddress = async (
    contactId: number,
  ): Promise<Message[]> => {
    try {
      const result = await db.getAllAsync<Message[]>(
        `
            SELECT id, contactId, address, body, date, type, deleviryState
            FROM messages
            WHERE contactId = ?
            ORDER BY date ASC
          `,
        [contactId],
      );
      return result ?? [];
    } catch (err) {
      console.log("err jj", err);
      return [];
    }
  };
  const addMessage = async (message: Message) => {
    try {
      const { address, type, date, body, deleviryState, contactId } = message;

      await db.runAsync(
        `
      INSERT INTO messages (contactId, address, body, date, type, deleviryState)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
        [contactId, address, body, date, type, deleviryState],
      );
    } catch (err) {
      console.error("Add message error:", err);
    }
  };

  const handleAddCall = async (call: Calls) => {
    try {
      const { address, contactName, timestamp } = call;

      await db.runAsync(
        `
      INSERT INTO calls (address, contactName, timestamp)
      VALUES (?, ?, ?)
      `,
        [address, contactName, timestamp],
      );
    } catch (err) {
      console.error("Add call error:", err);
    }
  };

  const handleGetCallsList = async (): Promise<Calls[]> => {
    setIsloading(true);
    try {
      const result = await db.getAllAsync<Calls>(`
          SELECT * FROM calls ORDER BY id DESC
        `);
      console.log(result);
      return result;
    } catch (err) {
      throw new Error(`ERROR occured while fetching calls table${err}`);
    } finally {
      setIsloading(false);
    }
  };

  const handleGetContactsList = async () => {
    setIsloading(true);
    try {
      const result = await db.getAllAsync<Contact>(`
        SELECT * FROM contacts ORDER BY id DESC
        `);
      setContacts(result);
      return result;
    } catch (err) {
      throw new Error(`ERROR occured while fetching contacts table${err}`);
    } finally {
      setIsloading(false);
    }
  };

  const getLatestMessages = async () => {
    try {
      const result = await db.getAllAsync(`
        SELECT m1.*
        FROM messages m1
        INNER JOIN (
          SELECT address, MAX(date) as maxDate
          FROM messages
          GROUP BY address
          ) m2
          ON m1.address = m2.address
          AND m1.date = m2.maxDate
          ORDER BY m1.date DESC
          `);
      return result ?? [];
    } catch (err) {
      console.log("err jj", err);
    }
  };

  const getContactById = async (id: string): Promise<Contact | null> => {
    setIsloading(true);
    try {
      const contact = await db.getFirstAsync<Contact>(
        `SELECT * FROM contacts WHERE id = ?`,
        [id],
      );
      console.log("creation", contact);
      return contact;
    } catch (err) {
      console.error("Error fetching contact by ID:", err);
      return null;
    } finally {
      setIsloading(false);
    }
  };
  const handleCreateContact = async (contact: Contact) => {
    setIsloading(true);
    try {
      console.log("contact to be created", contact);
      const { firstName, lastName, address, postalCode, email, image } =
        contact;
      const result = await db.runAsync(
        `
  INSERT INTO contacts (firstName, lastName, address, postalCode, email, image)
  VALUES (?, ?, ?, ?, ?, ?)
  `,
        [firstName, lastName, address, postalCode, email, image],
      );

      setContacts((prev) => [
        ...prev,
        { ...contact, id: result.lastInsertRowId.toString() },
      ]);
    } catch (err) {
      throw new Error(`ERROR occured while creating  contact table ${err}`);
    } finally {
      setIsloading(false);
    }
  };

  const handleDeleteConatct = async (id: string) => {
    setIsloading(true);
    try {
      await db.runAsync(
        `
        DELETE FROM contacts WHERE id=?`,
        [id],
      );
    } catch (err) {
      throw new Error(`ERROR occured while deleting contact table ${err}`);
    } finally {
      setIsloading(false);
    }
  };

  const handleUpdateContact = async (
    id: string,
    fields: Partial<Omit<Contact, "id">>,
  ) => {
    setIsloading(true);
    try {
      const fieldsKeys = Object.keys(fields);

      if (fieldsKeys.length === 0) return;

      const updateFields = fieldsKeys.map((key) => `${key} = ?`).join(", ");
      const values = fieldsKeys.map((key) => fields[key]);

      await db.runAsync(`UPDATE contacts SET ${updateFields} WHERE id = ?`, [
        ...values,
        id,
      ]);

      setContacts((prev) =>
        prev.map((contact) =>
          contact.id == id ? { ...contact, ...fields } : contact,
        ),
      );
    } catch (err) {
      throw new Error(`ERROR occured while updating  contact table ${err}`);
    } finally {
      setIsloading(false);
    }
  };

  const value: DataBaseContextType = {
    contacts: contacts,
    isLoading,
    getContactById,
    addMessage,
    getLatestMessages,
    handleAddCall,
    handleGetCallsList,
    getConversationByaddress,
    getConatctsList: handleGetContactsList,
    createContact: handleCreateContact,
    deleteContact: handleDeleteConatct,
    updateContact: handleUpdateContact,
    onInitDb: handleInitDataBase,
  };

  return (
    <DataBaseContext.Provider value={value}>
      {children}
    </DataBaseContext.Provider>
  );
};

export const useDataBaseContext = () => {
  const context = useContext(DataBaseContext);
  if (!context)
    throw new Error("useDataBase must be used inside DataBaseProvider");
  return context;
};
