import React, { memo } from "react";
import { Circle, Path, Svg, type SvgProps } from "react-native-svg";

export const SearchIcon = memo(({ color = "#000000", ...rest }: SvgProps) => {
  ``;
  return (
    <Svg
      color={color}
      fill="none"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...rest}
    >
      <Path d="m21 21-4.34-4.34" />
      <Circle cx="11" cy="11" r="8" />
    </Svg>
  );
});
``;
