import { useEffect } from "react";
import { StatusBar, View } from "react-native";
import * as Notifications from "expo-notifications";
import { PushNotificationService } from "./service/PushNotificationService";
import { registerForPushNotificationsAsync } from "./helpers/registerForPushNotificationsAsync";
import Home from "./screens/Home";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewNews from "./screens/ViewNews";
import { useMainStore } from "./stores/main";
import { theme } from "./theme";
import { StudyCaseService } from "./service/StudyCaseService";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

export default function App() {
  const { setStudyCases, setExpoToken } = useMainStore();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoToken(token ?? ""))
      .catch((error: any) => setExpoToken(`${error}`));
  }, []);

  useEffect(() => {
    const run = async () => {
      const cases = await StudyCaseService.getStudyCases();

      setStudyCases(cases);
    };

    run();
  }, []);

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <StatusBar barStyle={"light-content"} />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewNews"
            component={ViewNews}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
