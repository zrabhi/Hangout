import { memo } from "react";
import { Path, Svg, type SvgProps } from "react-native-svg";

export const AddIcon = memo(({ color = "#0000", ...rest }: SvgProps) => {
  return (
    <Svg {...rest} viewBox="0 0 24 24" fill={color}>
      <Path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></Path>
    </Svg>
  );
});
