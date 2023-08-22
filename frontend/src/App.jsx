import Product from "./Pages//Product";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProductList from "./Pages/ProductList";
import Cart from "./Pages/Cart";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Success from "./Pages/Success";
import { useSelector } from "react-redux";
function App() {
	const { user } = useSelector((state) => state.user);
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/products/:category" element={<ProductList />} />
				<Route path="/product/:id" element={<Product />} />
				<Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
				<Route
					path="/register"
					element={user ? <Navigate to="/" /> : <Register />}
				/>
				<Route path="/cart" element={<Cart />} />
				<Route path="/success" element={<Success />} />
			</Routes>
			<ToastContainer />
		</div>
	);
}

export default App;
