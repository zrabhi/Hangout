/* eslint-disable */
import { type Calls } from "@/types/Calls";
import { type Contact } from "@/types/Contacts";
import { DeleviryStateType, Inbox, type Message } from "@/types/Message";
import { CrudOperationRetun } from "@/utils/TableCreationReturn";
import { useSQLiteContext } from "expo-sqlite";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContactMessageSummary
  extends Message, Pick<Contact, "firstName" | "lastName"> {}

interface DataBaseContextType {
  contacts: Contact[];
  isAddingMessage: boolean;
  isLoading: boolean;
  createContact: (contact: Contact) => Promise<CrudOperationRetun>;
  deleteContact: (id: string) => Promise<void>;
  getConatctsList: () => Promise<Contact[]>;
  getContactById: (id: string) => Promise<Contact | null>;
  updateMessageStatus: (
    id: number,
    status: DeleviryStateType,
  ) => Promise<{
    success: boolean;
    id: number;
  }>;
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>
  getConversationByContactId: (
    address: number,
  ) => Promise<ContactMessageSummary[]>;
  addMessage: (message: Message) => Promise<CrudOperationRetun>;
  getCallList: () => Promise<Calls[]>;
  getInbox: () => Promise<Inbox[]>;
  handleAddCall: (call: Calls) => Promise<CrudOperationRetun>;
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
  const [isAddingMessage, setIsAddingMessage] = useState<boolean>(false);
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
          deleviryState number,
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

  const getConversationByContactId = async (
    contactId: number,
  ): Promise<ContactMessageSummary[]> => {
    setIsloading(true);
    try {
      const result = await db.getAllAsync<ContactMessageSummary>(
        `
      SELECT 
        m.id,
        m.body,
        m.date,
        m.type,
        m.deleviryState,
        c.firstName,
        c.lastName
      FROM messages m
      JOIN contacts c 
        ON m.contactId = c.id
      WHERE m.contactId = ?
      ORDER BY m.date ASC
    `,
        [contactId],
      );
      return result ?? [];
    } catch (err) {
      console.log(
        "errot occured while attempting to get converstation by ID",
        err,
      );
      return [];
    } finally {
      setIsloading(false);
    }
  };

  const addMessage = async (message: Message): Promise<CrudOperationRetun> => {
    setIsAddingMessage(true);
    try {
      const { address, type, date, body, deleviryState, contactId } = message;

      const result = await db.runAsync(
        `
        INSERT INTO messages (contactId, address, body, date, type, deleviryState)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [contactId, address, body, date, type, deleviryState],
      );
      return {
        success: true,
        id: result.lastInsertRowId,
      };
    } catch (err) {
      console.error("Add message error:", err);
      return {
        success: false,
        id: 0,
      };
    } finally {
      setIsAddingMessage(false);
    }
  };

  const updateMessageStatus = async (
    id: number,
    status: DeleviryStateType,
  ): Promise<{ success: boolean; id: number }> => {
    try {
      await db.runAsync(`UPDATE messages SET deleviryState = ? WHERE id = ?`, [
        status,
        id,
      ]);
      return { success: true, id };
    } catch (err) {
      console.error("Update message status error:", err);
      return { success: false, id };
    }
  };

  const handleAddCall = async (call: Calls): Promise<CrudOperationRetun> => {
    try {
      const { address, contactName, timestamp, contactId } = call;

      const result = await db.runAsync(
        `
        INSERT INTO calls (address, contactName, timestamp, contactId)
        VALUES (?, ?, ?, ?)
        `,
        [address, contactName, timestamp, contactId],
      );
      return {
        success: true,
        id: result.lastInsertRowId,
      };
    } catch (err) {
      console.error("Add call error:", err);
      return {
        success: true,
        id: 0,
      };
    }
  };

  const getConatctsList = async () => {
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

  const getInbox = async (): Promise<Inbox[] | []> => {
    setIsloading(true);
    try {
      const result = await db.getAllAsync<Inbox>(`
          SELECT 
          m.id,
          m.body,
          m.date,
          m.type,
          m.deleviryState,
          m.contactId,
          c.firstName,
          c.lastName,
          c.image
          FROM messages m
          INNER JOIN (
            SELECT contactId, MAX(date) as maxDate
            FROM messages
            GROUP BY contactId
            ) grouped
            ON m.contactId = grouped.contactId
            AND m.date = grouped.maxDate
            INNER JOIN contacts c
            ON m.contactId = c.id
            ORDER BY m.date DESC
            `);

      return result ?? [];
    } catch (err) {
      return [];
    }
     finally {
       setIsloading(false)
     }
  };

  const getCallList = async (): Promise<Calls[]> => {
    setIsloading(true);
    try {
      const result = await db.getAllAsync<Calls>(`
              SELECT * FROM calls ORDER BY id DESC
              `);
      return result;
    } catch (err) {
      // toast need to appear here 
      throw new Error(`ERROR occured while fetching calls table${err}`);
      return [];
    } finally {
      setIsloading(false);
    }
  };

  const getContactById = async (id: string): Promise<Contact | null> => {
    setIsloading(true);
    try {
      const contact = await db.getFirstAsync<Contact>(
        `SELECT * FROM contacts WHERE id = ?`,
        [id],
      );
      return contact;
    } catch (err) {
      console.error("Error fetching contact by ID:", err);
      return null;
    } finally {
      setIsloading(false);
    }
  };
  const handleCreateContact = async (
    contact: Contact,
  ): Promise<CrudOperationRetun> => {
    setIsloading(true);
    try {
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

      return {
        success: true,
        id: result.lastInsertRowId,
      };
    } catch (err) {
      throw new Error(`ERROR occured while creating  contact table ${err}`);
    } finally {
      setIsloading(false);
      return {
        success: true,
        id: 0,
      };
    }
  };

 const handleDeleteConatct = async (id: string) => {
  setIsloading(true);
  try {
    await db.withTransactionAsync(async () => {
      await db.runAsync(`DELETE FROM messages WHERE contactId = ?`, [id]);

      await db.runAsync(`DELETE FROM calls WHERE contactId = ?`, [id]);

      await db.runAsync(`DELETE FROM contacts WHERE id = ?`, [id]);
    });


  } catch (err) {
    throw new Error(`ERROR occurred while deleting contact: ${err}`);
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
    getInbox,
    handleAddCall,
    getCallList,
    getConversationByContactId,
    isAddingMessage,
    getConatctsList,
    updateMessageStatus,
    createContact: handleCreateContact,
    deleteContact: handleDeleteConatct,
    updateContact: handleUpdateContact,
    onInitDb: handleInitDataBase,
    setContacts,
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
