import { useDataBaseContext } from "@/context/DatabaseContext"
import { callContact } from "@/nativeModule/sms/smsService";

export const useCallContact = () => {
    const {handleAddCall} = useDataBaseContext()


     const handleCallContact = async (
        address: string,
        contactName: string,
        contactId: number,
      ) => {
        const result = await callContact(address);
        console.log("imhereeee", result);
        if (!result.success) return; // i need to display toested in red , indicating failed attempt
    
        await handleAddCall({
          address,
          contactId,
          contactName,
          timestamp: Date.now().toString(),
        });
      };

      return {
        handleCallContact
      }
}