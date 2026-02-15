import { PermissionsAndroid ,Permission} from "react-native";

export const usePermissionCheck = (permission: Permission) => {
  const requestPermission = async () => {
      try {
          const granted = await PermissionsAndroid.request(
             permission,
              {
                  title: "SMS Permission",
                  message: "This app needs access to your SMS messages.",
                  buttonPositive: "OK",
                },
            );
            
            console.log(granted)

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn("error permission", err);
      return false;
    }
  };
  return {
    requestPermission,
  };
};
