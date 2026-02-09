import React, { memo } from "react";
import { Circle, Path, Rect, Svg, type SvgProps } from "react-native-svg";

export const ContactsIcon = memo(({ color = "#000000", ...rest }: SvgProps) => {
  
  return (
    <Svg
      {...rest}
      width="20"
      color={color}
      height="20"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Path d="M16 2v2" />
      <Path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
      <Path d="M8 2v2" />
      <Circle cx="12" cy="11" r="3" />
      <Rect x="3" y="4" width="18" height="18" rx="2" />
    </Svg>
  );
});
