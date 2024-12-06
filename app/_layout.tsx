import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

import DialogProvider from "@/components/dialog/DialogProvider";

export default function RootLayout() {
  return (
    <PaperProvider theme={{ dark: false }}>
      <DialogProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </DialogProvider>
    </PaperProvider>
  );
}
