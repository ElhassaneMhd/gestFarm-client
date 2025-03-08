import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App.jsx";
import { i18n } from "./i18n/config.js";

// import { ErrorScreen } from "./components/ui/ErrorScreen.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

import "./styles/index.css";
import { I18nextProvider } from "react-i18next";
import { ConfirmationModalProvider } from "./context/ConfirmationModal.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ConfirmationModalProvider>
          <App />
        </ConfirmationModalProvider>
      </QueryClientProvider>
    </I18nextProvider>
  </ThemeProvider>
);
