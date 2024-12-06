import { useHeaderHeight } from "@react-navigation/elements";
import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, StatusBar } from "react-native";

export default function KeyboardAvoider(props: { children: ReactNode }) {
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={headerHeight + StatusBar.currentHeight!}
    >
      {props.children}
    </KeyboardAvoidingView>
  );
}
