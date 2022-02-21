import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { Chat } from "./pages/Chat";
import { Home } from "./pages/Home";

export const PriveteRoute = ({ children }: any) => {
  if (localStorage.getItem("user")) {
    return children;
  }

  return <Navigate to="/" />;
};

function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<Home />} />
            <Route
              path="/chat"
              element={
                <PriveteRoute>
                  <Chat />
                </PriveteRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
