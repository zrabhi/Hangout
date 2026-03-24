import Colors from "./Colors";
import { type ColorVariants } from "./ColorVarianrts";

export const colorsMap: Record<ColorVariants, string> = {
  blue: Colors.primary.blue[100],   // Tailwind blue-500
  orange: Colors.primary.orange[100], // Tailwind orange-500
  green: Colors.primary.green[100],   // Tailwind green-500

};