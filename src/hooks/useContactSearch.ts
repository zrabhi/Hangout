import { useEffect, useState } from "react";
import { type Contact } from "@/types/Contacts";

export const useContactsSearch = (contacts: Contact[]) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts);

  useEffect(() => {
    if (!searchValue.trim()) {
      setFilteredContacts(contacts);
    } else {
      const query = searchValue.toLowerCase();
      const filtered = contacts.filter((c) => {
        const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
        const phone = c.phoneNumber?.toLowerCase() ?? "";
        return fullName.includes(query) || phone.includes(query);
      });
      setFilteredContacts(filtered);
    }
  }, [searchValue, contacts]);

  return { searchValue, setSearchValue, filteredContacts };
};