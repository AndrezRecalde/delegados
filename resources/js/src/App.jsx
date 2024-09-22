import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useState } from "react";

function App() {
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          fontFamily: "Poppins, Greycliff CF, sans-serif",
          fontFamilyMonospace: "Poppins, Greycliff CF, sans-serif",
          headings: { fontFamily: "Poppins, Greycliff CF, sans-serif" },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Provider store={store}>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
