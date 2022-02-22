import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { Chat } from "./pages/Chat";
import { Home } from "./pages/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
