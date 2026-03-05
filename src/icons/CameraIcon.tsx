import React, { memo } from "react";
import { Circle, Path, Svg, type SvgProps } from "react-native-svg";

export const CameraIcon = memo(({ color = "#000000", ...rest }: SvgProps) => {
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
      <Path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
      <Circle cx="12" cy="13" r="3" />
    </Svg>
  );
});
``;
