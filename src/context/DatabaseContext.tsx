import { type Contact } from "@/types/Contacts";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Message } from "@/types/Message";
interface DataBaseContextType {
  contacts: Contact[];
  isLoading: boolean;
  createContact: (contact: Contact) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  getConatctsList: () => Promise<Contact[]>;
  getContactById: (id: string) => Promise<Contact | null>;
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
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS contacts  (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
          firstName TEXT NOT null,
          lastName TEXT NOT null,
          phoneNumber TEXT,
          postalCode TEXT,
          email TEXT,
          image TEXT
          );
          `);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          contactId INTEGER,
          body TEXT,
          date INTEGER,
          FOREIGN KEY(contactId) REFERENCES contacts(id)
        );
        
        `);
    } catch (err) {
      throw new Error(`ERROR occured while Init DB ${err}`);
    } finally {
      setIsloading(false);
    }
  };

  const addMessage = async (message: Message) => {
    setIsloading(true);
    try {
      const { contactId, type, date, body } = message;
      await db.runAsync(
        `
          INSERT INTO  messages (contactId, body, date, type)
          VALUES (?, ?, ?, ?);
        `,
        [contactId, body, date, type],
      );
    } catch (err) {
      throw new Error(`ERROR occured while adding message ${err}`);
    } finally {
      setIsloading(false);
    }
  };
  useEffect(() => {
    handleInitDataBase();
  }, []);

  // const handleDropTables = async () => {
  //   try {
  //     await db.runAsync(`
  //         DROP TABLE IF EXISTS
  //       `);
  //   } catch (err) {}
  // };

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

  const getContactsWithMessages = async () => {
    const result = await db.execAsync(`
    SELECT c.id as contactId, c.firstName, c.lastName, c.phoneNumber, c.image,
           m.body, m.date
    FROM contacts c
    INNER JOIN messages m ON c.id = m.contactId
    WHERE m.date = (
        SELECT MAX(date) FROM messages WHERE contactId = c.id
    )
    ORDER BY m.date DESC;
  `);
    return result[0].rows._array;
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
      const { firstName, lastName, phoneNumber, postalCode, email, image } =
        contact;
      const result = await db.runAsync(
        `
  INSERT INTO contacts (firstName, lastName, phoneNumber, postalCode, email, image)
  VALUES (?, ?, ?, ?, ?, ?)
  `,
        [firstName, lastName, phoneNumber, postalCode, email, image],
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
