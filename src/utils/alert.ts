import { Alert, Platform } from "react-native";

/**
 * Cross-platform confirm dialog that works on web, iOS, and Android
 */
export const showConfirm = (
  title: string,
  message: string,
  onConfirm: () => void,
  confirmText: string = "OK",
  cancelText: string = "Cancel"
) => {
  if (Platform.OS === "web") {
    if (window.confirm(`${title}\n${message}`)) {
      onConfirm();
    }
  } else {
    Alert.alert(title, message, [
      { text: cancelText, style: "cancel" },
      { text: confirmText, style: "destructive", onPress: onConfirm },
    ]);
  }
};

/**
 * Cross-platform alert (no confirmation needed)
 */
export const showAlert = (title: string, message: string) => {
  if (Platform.OS === "web") {
    window.alert(`${title}\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};
