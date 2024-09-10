import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts } from "./features/Product/ProductSlice";
import Navbar from "./components/Navbar";

const App = () => {
	const { products, status, error } = useSelector((state) => state.product);
	const dispatch = useDispatch();

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchProducts());
		}
	}, [status, dispatch]);

	const addToCartHandler = (product) => {
		console.log(product);
		dispatch(addToCart(product));
	};

	if (status === "loading") {
		return <div className="text-center">Loading...</div>;
	}
	if (status === "failed") {
		return <div>{error}</div>;
	}
	return (
		<div>
			<Navbar />
			<div className="flex justify-center items-center gap-5 flex-wrap mt-10">
				{products?.map((product) => (
					<div
						key={product.id}
						className="card bg-white shadow-xl space-y-3 rounded-xl w-64 px-4 h-80"
					>
						<div className="grid place-items-center">
							<img
								className="size-32 object-cover	"
								src={product.thumbnail}
								alt="img"
							/>
						</div>
						<h1 className="font-bold line-clamp-1">{product.title}</h1>
						<p className=" line-clamp-1 font-bold">
							<span>$</span>
							{product.price}
						</p>
						<p className="flex items-center gap-2 font-semibold">
							<span>Rating</span>
							<span className="text-yellow-400">{product.rating}</span>
						</p>
						<button
							onClick={() => addToCartHandler(product)}
							className="bg-yellow-400 px-4 py-2 rounded-lg font-semibold w-full"
						>
							Add to cart
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
