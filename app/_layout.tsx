import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StripeProvider } from "@stripe/stripe-react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = Font.useFonts({
    Fredoka: require("../assets/fonts/Fredoka-Regular.ttf"),
  });

  const loadFont = async () => {
    await Font.loadAsync({
      Fredoka: require("../assets/fonts/Fredoka-Regular.ttf"),
    });
  };

  useEffect(() => {
    loadFont();
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <StripeProvider
      publishableKey="pk_test_51PgdLoGXQ1iVSXMTTne3imnV4qo7CYqw4NpNT2K67acJObmz0OVCGIY1ui63xuQoyqTztFOoQDaWHARRwVbE58cU00RSvk8kdx"
      merchantIdentifier="merchant.identifier" // required for Apple Pay
    >
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="auth/index" options={{ headerShown: false }} />
          <Stack.Screen name="auth/register" options={{ headerShown: false }} />
          <Stack.Screen
            name="(splash)/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="restaurant/[id]"
            options={{ headerShown: false, title: "Restaurant" }}
          />
          <Stack.Screen
            name="menu/[id]"
            options={{ headerShown: false, title: "Menu" }}
          />
          <Stack.Screen
            name="checkout/index"
            options={{ headerShown: false, title: "Checkout" }}
          />
          <Stack.Screen
            name="editProfile/index"
            options={{
              headerShown: false,
              title: "Edit Profile",
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </StripeProvider>
  );
}
