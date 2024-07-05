import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes";
import './index.css';
import { Provider } from "react-redux";
import { store } from "./features/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
