import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./src/screens/Splash";
import Interfaces from "./src/screens/Interfaces";
import LoginForm, { MyComponent } from "./src/screens/Login";
import SignUpForm from "./src/screens/Signup";
import Forgotpassword from "./src/screens/Forgotpassword";
import Home from "./src/screens/Home";
import MyTabs from "./src/screens/Tab";
import PetShops from "./src/screens/PetShops";
import Vets from "./src/screens/Vets";
import Chatbot from "./src/screens/Chatbot";
import Vetsbooking from "./src/screens/Vetsbooking.jsx";
import Productdetails from "./src/screens/Productdetails";
import Mycart from "./src/screens/Mycart";
import Checkout from "./src/screens/Checkout";
import Debitcard from "./src/screens/Debitcard";
import Orderplaced from "./src/screens/Orderplaced";
import Settings from "./src/screens/Settings";
import MyChip from "./src/screens/MyChip";
import Chips from "./src/screens/Chips";
import Access from "./src/screens/Access";
import language from "./src/screens/language";
import Mood from "./src/screens/Mood";
import PetLocation from "./src/screens/Location";
import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator();

const AuthContext = React.createContext();

const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "LOG_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "LOG_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: true,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        console.error(e);
      }
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      login: async (data) => {
        dispatch({ type: "LOG_IN", token: "dummy-auth-token" });
      },
      logout: () => dispatch({ type: "LOG_OUT" }),
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          {state.userToken == null ? (
            <>
              <Stack.Screen
                name="Interfaces"
                component={Interfaces}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ header: ({ navigation, route }) => <MyComponent /> }}
              />
              <Stack.Screen
                name="Login"
                component={() => {
                  return (
                    <LoginForm
                      loggedIn={() => {
                        return dispatch({
                          type: "LOG_IN",
                          token: "dummy-auth-token",
                        });
                      }}
                    />
                  );
                }}
                options={{ header: ({ navigation, route }) => <MyComponent /> }}
              />
              <Stack.Screen
                name="Signup"
                component={() => {
                  return (
                    <SignUpForm
                      loggedIn={() => {
                        return dispatch({
                          type: "LOG_IN",
                          token: "dummy-auth-token",
                        });
                      }}
                    />
                  );
                }}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Forgotpassword"
                component={Forgotpassword}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={({ navigation }) => {
                  return (
                    <MyTabs
                      navigation={navigation}
                      logout={() => {
                        dispatch({ type: "LOG_OUT" });
                      }}
                    />
                  );
                }}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PetShops"
                component={PetShops}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Vets"
                component={Vets}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Chatbot"
                component={Chatbot}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Vetsbooking"
                component={Vetsbooking}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Productdetails"
                component={Productdetails}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Mycart"
                component={Mycart}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Checkout"
                component={Checkout}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Debitcard"
                component={Debitcard}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Orderplaced"
                component={Orderplaced}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MyChip"
                component={MyChip}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Chips"
                component={Chips}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Mood"
                component={Mood}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Location"
                component={PetLocation}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Access"
                component={Access}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="language"
                component={language}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
