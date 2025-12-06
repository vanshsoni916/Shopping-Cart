import { useDispatch } from "react-redux";
import Header from "./components/Header";
import Product from "./components/Product";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Cartlist from "./components/Cartlist";

function App() {
  const dispatch = useDispatch()
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-5xl mx-auto px-4 mt-10">        
        <Routes>
          <Route path="/"element={<Product/>}></Route>
          <Route path="/cart"element={<Cartlist/>}></Route>
        </Routes>

      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
