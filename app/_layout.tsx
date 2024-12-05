import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

import AuthProvider from "@/components/auth/AuthProvider";

export default function RootLayout() {
  return (
    <PaperProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </PaperProvider>
  );
}
