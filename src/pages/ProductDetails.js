import Layout from '../componenets/layout/Layout';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from '../context/cart';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ProductCard from '../componenets/ProductCard';

import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";



const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [cart, setCart] = useCart();
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [rating, setRating] = useState(null);
  const [message, setMessage] = useState("");


  const handleClick = (value) => {
    setRating(value === rating ? null : value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/v1/product/add-product-rating', {
        message: message,
        rating: rating,
        productId: product._id,
      });

      console.log(response.data);
      toast.success("Rating added to the cart");
    } catch (error) {
      toast.error("Rating not added to the cart");
    }
    setRating(null);
    setMessage("");


  };

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product?._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProductRating = async (pid) => {
    const productId = product._id;
    console.log(productId);
    try {
      const response = await axios.get("/api/v1/product/get-product-rating", productId);
      console.log(product);

      const { averageRating, messages } = response.data;
      setAverageRating(averageRating);
      setReviews(messages);
      console.log(averageRating);
      console.log(messages);
    } catch (error) {
      console.error("Error fetching product rating:", error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            // src={`/api/v1/product/product-photo/${product?._id}`}
            src={`/api/v1/product/product-photo/${product?._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          {cart.includes(product._id) ? (
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
          {/* <button class="btn btn-success ms-1" onClick={() => navigate(`/purchase/${product.slug}`)}
          >Buy </button> */}
          {/* navigate(/purchase/${product.slug} */}
          <button class="btn btn-success ms-1" onClick={() =>
            fetchProductRating()}>Buy </button>



        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="container mt-4">
          <div className="mb-3">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <span
                key={starValue}
                onClick={() => handleClick(starValue)}
                style={{ cursor: "pointer", fontSize: "24px" }}
              >
                {rating && starValue <= rating ? <FaStar color="#ffc107" /> : <FaRegStar color="#ffc107" />}
              </span>
            ))}
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Enter your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit Rating
            </button>
          </div>
        </div>
        {ratings.length > 0 && (
          <div className="mt-4">
            <h5>Ratings and Messages:</h5>
            {ratings.map((item, index) => (
              <div key={index} className="card mb-2">
                <div className="card-body">
                  <p className="card-text">
                    <strong>Rating:</strong> {item.rating}
                  </p>
                  <p className="card-text">
                    <strong>Message:</strong> {item.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <ProductCard key={p._id} product={p} />

          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;