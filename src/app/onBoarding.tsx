import { StyleSheet,Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

export default function OnBoeardingScreen() {
 
  
  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      horizontal
      style={styles.container}
      pagingEnabled
      contentContainerStyle={{   alignItems:'center',
    justifyContent:'center'}}
      onScroll={onScroll}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
    >
      <View>
        <Text>salam</Text>
      </View>
      <View>
        <Text>salam</Text>
      </View>
      {/* The final slide transitions us to Phase 2 */}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'red',
    
  },
});
