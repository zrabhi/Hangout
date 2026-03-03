import React, { memo } from "react";
import { Path, Rect, Svg, type SvgProps } from "react-native-svg";

export const NetworkIcon = memo(({ color = "#000000", ...rest }: SvgProps) => {
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
      <Rect x="16" y="16" width="6" height="6" rx="1" />
      <Rect x="2" y="16" width="6" height="6" rx="1" />
      <Rect x="9" y="2" width="6" height="6" rx="1" />
      <Path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <Path d="M12 12V8" />
    </Svg>
  );
});
``;
