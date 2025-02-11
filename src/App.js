import "./App.css";
import Products from "./Products";
import Cart from "./Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpLoads from "./UpLoads";
import './FontAwesome.config';
import Header from "./Header";
import ProductInfo from "./productInfo";

function App() {
  return (
    <div className="App">
      {/* <h2>REACT BASICS</h2> */}
      <BrowserRouter>
        <Routes>
          <Route path="/add" element={<UpLoads />} />
          <Route path="/header" element={<Header />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productInfo" element={<ProductInfo />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
