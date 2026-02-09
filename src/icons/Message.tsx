
import React, { memo } from "react";
import { Path, Svg, type SvgProps } from "react-native-svg";

export const MessageIcon = memo(({ color = "#000000", ...rest }: SvgProps) => {
  ``;
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
      <Path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
      <Path d="M12 11h.01" />
      <Path d="M16 11h.01" />
      <Path d="M8 11h.01" />
    </Svg>
  );
});
``;
