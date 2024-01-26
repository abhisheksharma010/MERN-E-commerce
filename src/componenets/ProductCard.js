import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/ProductCard.css";
import { useCart } from '../context/cart';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const isProductInCart = cart.includes(product._id);

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

                    {isProductInCart ? (
                        <FaHeart style={{ fontSize: "22px", color: "red" }} onClick={() => {
                            setCart(cart.filter(itemId => itemId !== product._id));
                            toast.success("Item removed from the cart");
                        }} />
                    ) : (
                        <CiHeart style={{ fontSize: "22px", color: "red" }} onClick={() => {
                            setCart([...cart, product._id]);
                            toast.success("Item added to the cart");
                        }} />
                    )}

                </div>
            </div>
            {/* Quick view button */}
            <button className="quick-view-btn" onClick={() => navigate(`/product/${product.slug}`)}>
                Quick view
            </button>
        </div>
    );
}

export default ProductCard;
