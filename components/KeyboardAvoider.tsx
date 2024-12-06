import { useHeaderHeight } from "@react-navigation/elements";
import { ReactNode } from "react";
import { KeyboardAvoidingView, StatusBar, StyleSheet } from "react-native";

export default function KeyboardAvoider(props: { children: ReactNode }) {
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={headerHeight + StatusBar.currentHeight!}
    >
      {props.children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
