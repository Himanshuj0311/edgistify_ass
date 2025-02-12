import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Layout from "./components/Layout/Layout";
import Details from "./page/Details";
import Cart from "./page/Cart";
import Login from "./page/Login";
import Checkout from "./page/Checkout";
import SignUp from "./page/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="details/:id" element={<Details />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
