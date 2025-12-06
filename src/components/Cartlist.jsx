import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { removeItem, clearAllItems } from "../redux/slice";

// Simple SVG Icons to avoid installing external libraries for this snippet
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);

export default function Cartlist() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartSelector = useSelector((state) => state.cart.items);

    const initialCart = JSON.parse(localStorage.getItem("cartItems")) || cartSelector;
    const [cartItems, setCartItems] = useState(initialCart);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        setCartItems(cartSelector);
    }, [cartSelector]);

    const manageQuantity = (id, q) => {
        let quantity = parseInt(q) > 1 ? parseInt(q) : 1;
        const cartTempItems = cartItems.map((item) => {
            return item.id === id ? { ...item, quantity } : item;
        });
        setCartItems(cartTempItems);
    };
    
    const handlePlaceOrder = () => {
        localStorage.clear();
        dispatch(clearAllItems());
        alert("Order Placed Successfully!");
        navigate("/");
    };

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => 
            item.quantity ? sum + item.price * item.quantity : sum + item.price, 0
        ).toFixed(2);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Shopping Cart</h2>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full">
                        {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                    </span>
                </div>

                <div className="flex flex-col gap-8">
                    {/* Cart Items List */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        {cartItems.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {cartItems.map((item) => (
                                    <li key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center gap-6 hover:bg-gray-50 transition-colors duration-200">
                                        
                                        {/* Product Image */}
                                        <div className="shrink-0">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="h-24 w-24 rounded-xl object-cover border border-gray-200 shadow-sm"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                                                    <p className="mt-1 text-sm text-gray-500 font-medium">{item.brand}</p>
                                                </div>
                                                <p className="text-lg font-bold text-gray-900 sm:hidden">
                                                    ₹{(item.quantity ? item.quantity * item.price : item.price).toFixed(2)}
                                                </p>
                                            </div>

                                            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                                {/* Quantity Control */}
                                                <div className="flex items-center gap-2">
                                                    <label htmlFor={`quantity-${item.id}`} className="text-sm text-gray-600">Qty:</label>
                                                    <input 
                                                        id={`quantity-${item.id}`}
                                                        type="number" 
                                                        min="1"
                                                        value={item.quantity || 1} 
                                                        onChange={(e) => manageQuantity(item.id, e.target.value)} 
                                                        className="w-20 rounded-lg border-gray-300 border py-1.5 px-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                                                    />
                                                </div>

                                                {/* Desktop Price & Remove */}
                                                <div className="flex items-center gap-6">
                                                    <p className="hidden sm:block text-lg font-bold text-gray-900">
                                                        ₹{(item.quantity ? item.quantity * item.price : item.price).toFixed(2)}
                                                    </p>
                                                    <button
                                                        onClick={() => dispatch(removeItem(item))}
                                                        className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium transition-colors p-2 rounded-lg hover:bg-red-50"
                                                    >
                                                        <TrashIcon />
                                                        <span className="hidden sm:inline">Remove</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                                <div className="bg-gray-100 p-4 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                                <p className="mt-1 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
                                <button 
                                    onClick={() => navigate('/')} 
                                    className="mt-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
                                >
                                    <ArrowLeftIcon />
                                    Start Shopping
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Order Summary / Footer */}
                    {cartItems.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                                <div className="text-center sm:text-left">
                                    <p className="text-sm text-gray-500">Total Amount</p>
                                    <p className="text-3xl font-extrabold text-gray-900">₹{calculateTotal()}</p>
                                </div>
                                
                                <button 
                                    onClick={handlePlaceOrder}
                                    className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-md transition-transform transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Checkout & Place Order
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}