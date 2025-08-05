import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Page/Layout";
import Product from "./Page/Product";
import AddProduct from "./component/AddProduct";
import Register from "./Page/Register";
import Login from "./Page/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Product />} />
          <Route path="/add" element={<AddProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
