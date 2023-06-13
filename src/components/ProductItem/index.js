import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

import "./index.css";

// For MUI components

const ProductItem = (props) => {
  const { eachProduct } = props;
  const { title, imageUrl, price, _id, category, quality } = eachProduct;

  return (
    <li className="col-md-3 col-12  p-2 productCard">
      <Link to={`/product/${_id}`} className="link">
        <div className="border d-flex flex-column p-3 desingItemCardParentCon">
          <div className="mb-2 ">
            <img
              src={imageUrl}
              alt="productImage"
              className="productImage rounded"
            />
          </div>
          <div className="cardDetailsCon">
            <h5 className="productHeading">{`${title.slice(0, 18)}${
              title.length >= 18 ? ".." : ""
            }`}</h5>
            <div className="d-flex justify-content-between mt-3 mb-2">
              <p className="m-0 small">Price :</p>
              <p className="filterHeading m-0 storeName h6">{`Rs. ${price}`}</p>
            </div>
            <div className="d-flex justify-content-between mt-3 mb-2">
              <p className="m-0 small">Category :</p>
              <p className="filterHeading m-0 storeName">{category}</p>
            </div>
            <div className="text-danger">
              <hr />
            </div>
            <div className="d-flex flex-column pb-2">
              <div className="d-flex justify-content-between">
                <p className="m-0 small">Quality</p>
                <Rating
                  name="read-only"
                  value={parseFloat(quality)}
                  readOnly
                  precision={0.1}
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductItem;
