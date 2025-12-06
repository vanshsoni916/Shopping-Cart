import { Link } from "react-router-dom"
import AddtoCart from "./AddtoCart"
const Header=()=>{
    return(
       <header className="bg-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">MyStore</h1>

        {/* Nav Links */}
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li className="hover:text-blue-600 cursor-pointer transition"> <Link to='/'> Home</Link></li>
          <li className="hover:text-blue-600 cursor-pointer transition">Products</li>
          <li className="hover:text-blue-600 cursor-pointer transition">Contacts</li>
        </ul>
        <AddtoCart/>
      </nav>
    </header>
    )
}

export default Header