import "./App.css";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Configs/FontAwesome.config";
import ProductInfo from "./Components/ProductInfo";
import Layout from "./Layout/Layout";
import ProductDetail from "./Components/ProductDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/productInfo" element={<ProductInfo />} /> */}
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/productInfo" element={<ProductInfo />} />
            <Route path="/product/:id" element={<ProductDetail/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
