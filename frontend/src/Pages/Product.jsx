import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;
const Wrapper = styled.div`
	padding: 50px;
	display: flex;
	${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
	flex: 1;
`;
const Image = styled.img`
	width: 100%;
	height: 80vh;
	object-fit: cover;
	${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
	flex: 1;
	padding: 0px 50px;
	${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
	font-weight: 200;
`;
const Desc = styled.p`
	margin: 20px 0px;
`;
const Price = styled.span`
	font-weight: 500;
	font-size: 40px;
`;
const AddContainer = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
	display: flex;
	align-items: center;
	font-weight: 700;
`;
const Amount = styled.span`
	width: 30px;
	height: 30px;
	border-radius: 10px;
	border: 1px solid teal;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0px 5px;
	font-weight: bolder;
`;
const Button = styled.button`
	padding: 15px;
	border: 2px solid teal;
	background-color: white;
	cursor: pointer;
	font-weight: 500;
	&:hover {
		background-color: #f8f4f4;
	}
`;

const Product = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const id = location.pathname.split("/")[2];
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	useEffect(() => {
		getProd();
	}, []);
	const getProd = async () => {
		const res = await axios.get(`http://localhost:8085/api/v1/jewellery/${id}`);
		if (res.data.status === "success") {
			setProduct(res.data.data[0]);
		} else {
			toast.error("Something went wrong!!!");
		}
	};
	const handleQuantity = (type) => {
		if (type === "dec") {
			if (quantity > 1) {
				setQuantity(quantity - 1);
			}
		} else {
			setQuantity(quantity + 1);
		}
	};
	const handleClick = () => {
		dispatch(
			addProduct({
				...product,
				quantity,
				price: product.jewellery_price * quantity
			})
		);
	};
	return (
		<Container>
			<Navbar />
			<Wrapper>
				<ImgContainer>
					<Image src={`http://localhost:8085/${product.jewellery_image}`} />
				</ImgContainer>
				<InfoContainer>
					<Title>{product.jewellery_name}</Title>
					<Desc>{product.jewellery_description}</Desc>
					<Price>₹ {product.jewellery_price}</Price>
					<AddContainer>
						<AmountContainer>
							<Remove
								style={{ cursor: "pointer" }}
								onClick={() => handleQuantity("dec")}
							/>
							<Amount>{quantity}</Amount>
							<Add
								style={{ cursor: "pointer" }}
								onClick={() => handleQuantity("inc")}
							/>
						</AmountContainer>
						<Button onClick={handleClick}>ADD TO CART</Button>
					</AddContainer>
				</InfoContainer>
			</Wrapper>
			<Newsletter />
			<Footer />
		</Container>
	);
};

export default Product;
