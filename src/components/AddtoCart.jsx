import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

export default function AddtoCart() {
  const cartSelector = useSelector((state)=>state.cart.items);
  console.log(cartSelector.length)

  return (
    <div className="relative cursor-pointer">
     
      <Link to='/cart'>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.6}
        stroke="currentColor"
        className="w-7 h-7 text-gray-700 hover:text-blue-600 transition"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75m-9.75 0L5.106 5.272A1.125 1.125 0 016.2 3.75h12.06c.72 0 1.26.673 1.095 1.374l-1.71 7.126a1.125 1.125 0 01-1.095.875H7.5zm9 4.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-8.25 1.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        />
      </svg>

     
        <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {cartSelector.length?cartSelector.length:0}
        </span>
      
      </Link>
     
    </div> 
  );  
}
