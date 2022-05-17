import "./main.css";
import { useState } from "react";
import { JwtContext } from "./shared/contexts/JwtContext";
import AppRoutes from "./app-routes/AppRoutes";
import Footer from "./shared/components/Footer/Footer";

function App() {
  const [jwt, setJwt] = useState(localStorage.getItem("token"));

  return (
    <JwtContext.Provider value={{ jwt, setJwt }}>
      <AppRoutes jwt={jwt} />
      <Footer />
    </JwtContext.Provider>
  );
}

export default App;
