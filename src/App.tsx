import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes";
import './index.css';

const App = () => {

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );

}

export default App;
