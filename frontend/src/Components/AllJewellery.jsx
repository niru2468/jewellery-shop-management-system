import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const AllJewellery = () => {
	const [jewellery, setJewellery] = useState([]);
	useEffect(() => {
		getProds();
	}, []);
	const getProds = async () => {
		const response = await axios.get("http://localhost:8085/api/v1/jewellery");
		if (response.data.status === "success") {
			setJewellery(response.data.data);
		} else {
			toast.error("something went wrong....");
		}
	};
	return (
		<div className="jewellery">
			<div className="row">
				{jewellery.map((j) => {
					return (
						<div className="col-md-3">
							<div className="card" style={{ width: "18rem" }}>
								<img
									src={`http://localhost:8085/${j.jewellery_image}`}
									className="card-img-top"
									alt="..."
								/>
								<div className="card-body">
									<h5 className="card-title" style={{ fontWeight: 600 }}>
										{j.jewellery_name}
									</h5>
									<p className="card-text">{j.jewellery_description}</p>
									<Link
										to={`/product/${j.jewellery_id}`}
										class="btn btn-primary"
									>
										Explore
									</Link>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AllJewellery;
