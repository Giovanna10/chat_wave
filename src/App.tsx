import "./App.css";
import AppRoutes from "./AppRoutes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
