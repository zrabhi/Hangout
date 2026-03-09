import AsyncStorage from "@react-native-async-storage/async-storage";

export const StorageKeys = {
  LANGUAGE: "app_language",
  HEADER_COLOR: "header_color",
};

type StorageKey = keyof typeof StorageKeys;


export async function setItem<T>(key: StorageKey, value: T): Promise<void> {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(StorageKeys[key], stringValue);
  } catch (error) {
    console.error("Error saving item", key, error);
  }
}


export async function getItem<T>(key: StorageKey): Promise<T | null> {
  try {
    const stringValue = await AsyncStorage.getItem(StorageKeys[key]);
    if (stringValue !== null) {
      return JSON.parse(stringValue) as T;
    }
    return null;
  } catch (error) {
    console.error("Error reading item", key, error);
    return null;
  }
}


export async function removeItem(key: StorageKey): Promise<void> {
  try {
    await AsyncStorage.removeItem(StorageKeys[key]);
  } catch (error) {
    console.error("Error removing item", key, error);
  }
}