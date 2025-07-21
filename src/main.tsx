import { createRoot } from 'react-dom/client';
import { ThemeProvider } from "next-themes";
import { HashRouter } from "react-router-dom"; // 🧠 THÊM DÒNG NÀY
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <HashRouter> {/* 🧠 BỌC LẠI */}
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <App />
    </ThemeProvider>
  </HashRouter>
);
