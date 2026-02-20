import { CallCard } from "@/components/CallCard";
import { Loader } from "@/components/ui/Loader";
import { useDataBaseContext } from "@/context/DatabaseContext";
import { useCallContact } from "@/hooks/usecCallContact";
import { Calls } from "@/types/Calls";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

export default function CallsScreen() {
  const {getCallList, isLoading} = useDataBaseContext()
  const [calls, setCalls] = useState<Calls[]>([])
 
  const {handleCallContact} = useCallContact()


 const handleGetCallsList = async () => {
  const result = await getCallList();
  setCalls(result);
 }

 useEffect(()=>{
  handleGetCallsList();
 }, [])

  if (isLoading) return <Loader />;
  return (
   <View style={styles.container}>
         <FlatList
           data={calls}
           extraData={calls}
           renderItem={({ item }) => (
             <CallCard
               onPressCall={handleCallContact}
               call={item}
             />
           )}
         />
       </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  text: {
    fontSize: 20,
    fontFamily: "Baloo2-SemiBold",

  },
});
