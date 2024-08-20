import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes";
import './index.css';
import { Provider } from "react-redux";
import { store } from "./features/store";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer />
          <AppRoutes />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
