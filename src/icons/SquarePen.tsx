
import React, { memo } from "react";
import { Path, Svg, type SvgProps } from "react-native-svg";

export const SquarePenIcon = memo(({ color = "#000000", ...rest }: SvgProps) => {
  ``;
  return (
    <Svg
    color={color}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill={"none"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...rest}
    >
      <Path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <Path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
    </Svg>
  );
});
``;
