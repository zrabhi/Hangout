import Colors from "@/utils/Colors";
import { View, ActivityIndicator,StyleSheet } from "react-native"



export const Loader = () =>{
    return (<View style={styles.activeIndocator}>
            <ActivityIndicator size={44}  color={Colors.primary.orange[100]} />
          </View>)
}

const styles = StyleSheet.create({
  
  activeIndocator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
 
});
