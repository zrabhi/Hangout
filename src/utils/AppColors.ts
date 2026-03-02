export enum AppColorName {
  WHITE = "white",
  LIGHT_GRAY = "lightGray",
  BLUE_TINT = "blueTint",
  GREEN_TINT = "greenTint",
  ORANGE_TINT = "orangeTint",
  PINK_TINT = "pinkTint",
}

export const AppColors: Record<AppColorName, string> = {
  [AppColorName.WHITE]: "#FFFFFF",
  [AppColorName.LIGHT_GRAY]: "#FAFAFA",
  [AppColorName.BLUE_TINT]: "#E3F2FD",
  [AppColorName.GREEN_TINT]: "#E8F5E9",
  [AppColorName.ORANGE_TINT]: "#FFF3E0",
  [AppColorName.PINK_TINT]: "#FCE4EC",
};
