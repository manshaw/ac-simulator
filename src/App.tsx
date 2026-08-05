import { useState } from "react";
import { HomeScreen } from "./screens/HomeScreen";
import { RemoteSelectScreen } from "./screens/RemoteSelectScreen";
import { RemoteScreen } from "./screens/RemoteScreen";
import { FanSelectScreen } from "./screens/FanSelectScreen";
import { FanScreen } from "./screens/FanScreen";
import { ACScreen } from "./screens/ACScreen";
import { ThemeToggle } from "./components/ThemeToggle";
import { ThemeProvider } from "./contexts/ThemeContext";
import { REMOTE_THEMES } from "./data/remoteThemes";
import { FAN_THEMES } from "./data/fanThemes";
import type { Screen } from "./types";

function AppScreens() {
  const [screen, setScreen] = useState<Screen>("home");
  const [remoteThemeId, setRemoteThemeId] = useState(REMOTE_THEMES[0].id);
  const [fanThemeId, setFanThemeId] = useState(FAN_THEMES[0].id);

  if (screen === "remote-select") {
    return (
      <RemoteSelectScreen
        onPick={(id) => {
          setRemoteThemeId(id);
          setScreen("remote");
        }}
        onBack={() => setScreen("home")}
      />
    );
  }

  if (screen === "remote") {
    const theme = REMOTE_THEMES.find((t) => t.id === remoteThemeId) ?? REMOTE_THEMES[0];
    return <RemoteScreen theme={theme} onBack={() => setScreen("remote-select")} />;
  }

  if (screen === "fan-select") {
    return (
      <FanSelectScreen
        onPick={(id) => {
          setFanThemeId(id);
          setScreen("fan");
        }}
        onBack={() => setScreen("home")}
      />
    );
  }

  if (screen === "fan") {
    const theme = FAN_THEMES.find((t) => t.id === fanThemeId) ?? FAN_THEMES[0];
    return <FanScreen theme={theme} onBack={() => setScreen("fan-select")} />;
  }

  if (screen === "ac") {
    return <ACScreen onBack={() => setScreen("home")} />;
  }

  return <HomeScreen onSelect={(s) => setScreen(s === "fan" ? "fan-select" : s)} />;
}

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <AppScreens />
    </ThemeProvider>
  );
}

export default App;
