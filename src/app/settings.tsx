import { ColorCard } from "@/components/ui/ColorCard";
import Colors from "@/utils/Colors";
import { View } from "react-native";

export default function SettingsScreen() {
  return <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>

    <ColorCard  selected name="orange" color={Colors.primary.orange[100]} />
    
  </View>;
}
