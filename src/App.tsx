import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes";
import './index.css';
import { Provider } from "react-redux";
import { store } from "./features/store";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
