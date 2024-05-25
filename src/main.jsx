import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

//pages
import Help from "./pages/Help";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import VerifyToken from "./pages/VerifyToken";
import RootLayout from "./components/Root/RootLayout";
import { Analytics } from "@vercel/analytics/react";

import ProtectedRoutes from "./utils/ProtectedRoutes";

// Contextprovider
import UserContextProvider from "./context/UserContextProvider";

import Me from "./pages/Me";

import ProductPage from "./pages/ProductPage";

// react - query: https://tanstack.com/query/v5/docs/framework/react/quick-start
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 5, retryDelay: 1000 } },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    // Route/RootLayout work like a wrapper
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      {/* <Route path='verify'element={<VerifyToken />}/>  */}
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<SignIn />} />

      <Route path="product" element={<ProductPage />} />

      <Route element={<ProtectedRoutes />}>
        {/* <Route path='chat'element={<ChatBubbleWindow/>}/>  */}
        {/* <Route path='status'element={<Status />}/>  */}
        <Route path="help" element={<Help />} />

        <Route path="me" element={<Me />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </UserContextProvider>
    </QueryClientProvider>
    <Analytics />
  </React.StrictMode>
);
