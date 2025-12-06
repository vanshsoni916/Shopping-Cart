import { useDispatch, useSelector } from 'react-redux'
import { addItem,removeItem } from '../redux/slice'
import { useEffect } from 'react'
import { fetchProduct } from '../redux/productSlice'

export default function Product() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProduct())
  }, [])
  const productSelector = useSelector((state) => (state.product.items));
  console.log(productSelector)
  const cartSelector = useSelector((state) => state.cart.items);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
      {productSelector.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl border hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          <div className="w-full h-48 bg-white p-2 flex items-center justify-center">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-full object-contain"
            />
          </div>

          <div className="px-4 py-3 space-y-1">
            <h3 className="text-base font-semibold truncate">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.brand}</p>
            <p className="text-lg font-bold text-green-700">₹{item.price}</p>
            <span className="text-yellow-500 text-sm font-medium flex items-center gap-1">
              ⭐ {item.rating}
            </span>
            {
              cartSelector.find((cartItem) => cartItem.id === item.id) ?
                <div className="flex gap-3 pt-3">

                  <button onClick={() => dispatch(removeItem(item))} className="flex-1 cursor-pointer bg-gray-600 text-white text-sm py-1.5 rounded-md hover:bg-gray-700">
                    Remove From Cart
                  </button>
                </div>
                :
                <div className="flex gap-3 pt-3">

                  <button onClick={() => dispatch(addItem(item))} className="flex-1 cursor-pointer bg-blue-600 text-white text-sm py-1.5 rounded-md hover:bg-blue-700">
                    Add
                  </button>
                </div>
            }
          </div>
        </div>
      ))}
    </div>

  );
}
