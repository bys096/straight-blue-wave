import React, { useEffect, useState } from "react";
import Header from "../components/views/Header";
import Footer from "../components/views/Footer";
import axios from "axios";

const ShoppingPage = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8080/products")
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<div>
			<Header></Header>
			<h1>쇼핑몰입니다</h1>
			<ul>
				{products.map((product) => (
					<li key={product.id}>
						{product.name} {product.price} {product.description}
					</li>
				))}
			</ul>
			<Footer></Footer>
		</div>
	);
};

export default ShoppingPage;
