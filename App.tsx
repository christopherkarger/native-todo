import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import List from "./app/list/list";

const fetchFonts = () => {
  return Font.loadAsync({
    "roboto-black": require("./assets/fonts/Roboto-Black.ttf"),
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  if (!appIsReady) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setAppIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return <List />;
}
