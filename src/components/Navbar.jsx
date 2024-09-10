import { useSelector } from "react-redux";

const Navbar = () => {
	const { cart } = useSelector((state) => state.product);
	return (
		<div className="flex justify-between items-center p-4">
			<h1 className="text-3xl font-bold">Redux test</h1>
			<div>
				Cart
				<span className="bg-red-500 text-white rounded-full text-center px-2">
					{cart.length}
				</span>
			</div>
		</div>
	);
};

export default Navbar;
