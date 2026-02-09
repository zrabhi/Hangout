import React, { memo } from "react";
import { Path, Svg, type SvgProps } from "react-native-svg";

export const MenuIcon = memo(({ color = "#000000", ...rest }: SvgProps) => {
  return (
    <Svg
      color={color}
      {...rest}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Path d="M10 5H3" />
      <Path d="M12 19H3" />
      <Path d="M14 3v4" />
      <Path d="M16 17v4" />
      <Path d="M21 12h-9" />
      <Path d="M21 19h-5" />
      <Path d="M21 5h-7" />
      <Path d="M8 10v4" />
      <Path d="M8 12H3" />
    </Svg>
  );
});
