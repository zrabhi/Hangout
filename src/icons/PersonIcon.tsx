
import React, { memo } from "react";
import { Circle, Path, Svg, type SvgProps } from "react-native-svg";

export const PersonIcon = memo(({ color = "#000000", ...rest }: SvgProps) => {
  return (
    <Svg
        color={color}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...rest}
    >
      <Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <Circle cx="12" cy="7" r="4" />
    </Svg>
  );
});
