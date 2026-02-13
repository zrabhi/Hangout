
import React, { memo } from "react";
import { Path, Svg, type SvgProps } from "react-native-svg";

export const LeftArrownIcon = memo(
  ({ color = "#000000", ...rest }: SvgProps) => {
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
        <Path d="m12 19-7-7 7-7" />
        <Path d="M19 12H5" />
      </Svg>
    );
  },
);
