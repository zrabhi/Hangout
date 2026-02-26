import { memo } from "react"
import { Pressable } from "react-native"
import { createAnimatedComponent, useSharedValue } from "react-native-reanimated"


const AnimatedPressable = createAnimatedComponent(Pressable);




export const AnimatedIcon = memo(() =>{

    const roation = useSharedValue(0);




    return (<></>)
})