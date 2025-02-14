import "./App.css";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpLoads from "./Components/UpLoads";
import "./Configs/FontAwesome.config";
import Header from "./Components/Header";
import ProductInfo from "./Components/ProductInfo";

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
