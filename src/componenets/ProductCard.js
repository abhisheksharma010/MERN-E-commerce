import React from 'react';
import "../styles/ProductCard.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
    return (
        <div className="scard">
            <img
                src={`/api/v1/product/product-photo/${product._id}`}
                alt="Card"
                className="scard-image"
            />
            {/* Star rating */}
            <div className='star'>
                <FaHeart />
                <FaHeart style={{ color: "#FFD700" }} />
                <FaHeart />
                <FaHeart />
                <FaHeart />
            </div>
            {/* Card body */}
            <div className='scard-body'>
                <div className='details'>
                    <h5>{product.name}</h5>
                    <p>${product.price}</p>
                </div>
                <div className='product-price'>
                    {/* Favourite button */}
                    <CiHeart style={{ fontSize: "22px" }} />
                </div>
            </div>
            {/* Quick view button */}
            <button className="quick-view-btn">Quick view</button>
        </div>
    );
}

export default ProductCard;
