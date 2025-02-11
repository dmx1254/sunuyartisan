import React from "react";
import { View } from "react-native";
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
} from "react-native-toast-message";

// Configuration personnalisée des toasts
export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#16a34a", backgroundColor: "#16a34a" }}
      text1Style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}
      text2Style={{ fontSize: 14, color: "#fff" }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#dc2626", backgroundColor: "#dc2626" }}
      text1Style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}
      text2Style={{ fontSize: 14, color: "#fff" }}
    />
  ),
};
