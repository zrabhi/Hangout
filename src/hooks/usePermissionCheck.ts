import {
  PermissionsAndroid,
  ToastAndroid,
  type Permission,
} from "react-native";

export const usePermissionCheck = (permission: Permission) => {
  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(permission, {
        title: "SMS Permission",
        message: "This app needs access to your SMS messages.",
        buttonPositive: "OK",
      });

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      ToastAndroid.show(
        `Error occured while checking user permissions, Please try again!`,
        ToastAndroid.TOP,

      );
      console.log(err)
      return false;
    }
  };

  return {
    requestPermission,
  };
};
