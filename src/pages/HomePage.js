import React, { useState, useEffect } from "react";
import Layout from "../componenets/layout/Layout";
import { useNavigate, Link } from "react-router-dom";
import "../styles/HomePage.css"
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Image, Collapse, Button } from 'react-bootstrap';

import { Prices } from "../componenets/Prices";
import { useCart } from "../context/cart"
const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [open, setOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);


  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const handleSortChange = (value) => {
    setSortOrder(value);
    // Additional logic based on the selected sorting option
  };
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const clearFilters = () => {
    setChecked([]);
    setRadio([]);
    setOpen(false);
  }
  const handleFilter = (value, id) => {
    if (id == null) {

      setChecked([]);
    }
    else {
      let all = [id];

      setChecked(all);
    }
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>

      {/* <Image src="/images/homebg.jpg" width={100} height={200} fluid rounded /> */}


      <Layout title={"ALl Products - Best offers "}>
        <div className=" banners">
          <img src="/images/banner-0.jpg" alt="Background Image" />
        </div>

        <div className="homepage-sections">
          <div className="row align-items-center">
            <div className="col text-center">
              <div className="custom-card">
                <img className="category-img" src="/images/girl.jpg" alt="Womens Image" />
                <div className="card-body">
                  <h5 className="card-title text-overlay">Womens <br /> Collection</h5>
                  <Link to="/womens" className="shop-now">Shop Now</Link>
                </div>
              </div>
            </div>
            <div className="col text-center">
              <div className="custom-card category-card" >
                <img className="category-img" src="/images/men.webp" alt="Mens Image" />
                <div className="card-body">
                  <h5 className="card-title text-overlay">Mens<br /> Collection</h5>
                  <Link to="/mens" className="shop-now">Shop Now</Link>
                </div>
              </div>
            </div>
            {/* Repeat similar structure for Womens and Childrens */}

            <div className="col text-center">
              <div className="custom-card">
                <img className="category-img" src="/images/accesssories.webp" alt="Childrens Image" />
                <div className="card-body">
                  <h5 className="card-title text-overlay">Accesories </h5>
                  <Link to="/childrens" className="shop-now">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>


          <div className="custom-container Filter-section navbar navbar-expand-lg shadow-none">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#filter" aria-controls="filter" aria-expanded="false" aria-label="Toggle navigation">
              <span>Filters </span>
            </button>
            <div className="custom-container collapse navbar-collapse column" id="filter">
              <div className="filter-category">            <span
                className={`custom-heading ${checked.length === 0 ? 'text-dark' : ''}`}
                onClick={() => handleFilter(!checked.includes(null), null)}
              >
                All Products
              </span>

                {categories?.map((c) => (
                  <span
                    key={c._id}
                    className={`custom-category ${checked.includes(c._id) ? 'text-dark' : ''}`}
                    onClick={() => handleFilter(!checked.includes(c._id), c._id)}
                  >
                    {c.name}
                  </span>
                ))}
              </div>
              <div className="filter-button">
                <button
                  className="custom-button btn btn-outline-primary"
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  {open ? '🔦 Hide Filters' : ' 🔦Show Filters'}
                </button>

                {open && (
                  <div>
                    {/* Your filter input components or any additional content goes here */}
                  </div>
                )}

                <button
                  className="btn btn btn-outline-danger rounded custom-reset-button"
                  onClick={() => clearFilters()}
                >
                  ↻ RESET FILTERS
                </button>
              </div>
            </div>

            {/* //dem0 */}</div>
          <div className=" menu-filter mt-3">

            <Collapse in={open} className="collapse-filter">
              <div id="example-collapse-text filters" className="col-md-2 center">
                <div className="filters">
                  <div className="d-flex flex-column filter-price">
                    <h2>Prices</h2>
                    <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                      {Prices?.map((p) => (
                        <div key={p._id}>
                          <Radio value={p.array}>{p.name}</Radio>
                        </div>
                      ))}
                    </Radio.Group>
                  </div>
                  <div className="d-flex flex-column filter-sort">
                    <h2 className="sort-label">Sort by</h2>
                    <Radio.Group onChange={(e) => setSortOrder(e.target.value)}>
                      <div>
                        <Radio className="sort-radio" value="default">Default</Radio>
                      </div>
                      <div>
                        <Radio className="sort-radio" value="highToLow">High to Low</Radio>
                      </div>
                      <div>
                        <Radio className="sort-radio" value="lowToHigh">Low to High</Radio>
                      </div>
                    </Radio.Group>
                  </div>
                </div>
              </div>
            </Collapse>


          </div>
          {/* price filter */}


          {/* <div className=" col-md-9"> */}
          {/* <h1 className="text-center">All Products</h1> */}
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="product-card" >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="product-img "
                  alt={p.name}
                />
                <div className="card-body">
                  {/* className="shop-now" */}
                  <h5 className="card-title .text-secondary">{p.name}</h5>
                  {/* <p className="card-text">
                        {p.description.substring(0, 30)}...
                      </p> */}
                  <p className="card-text h-6 .text-secondary"> $ {p.price}</p>
                  <button type="button" className="shop-now btn btn-outline-secondary" onClick={() => navigate(`/product/${p.slug}`)}
                  >Quick View</button>


                  {/* <button class="btn btn-primary ms-1" onClick={() => {
                        navigate(`/product/${p.slug}`)
                      }}>More Details</button> */}
                  {/* <button class="btn btn-secondary ms-1" onClick={() => {
                        setCart([...cart, p]);
                        console.log(cart?.length)
                      }

                      
                      }>ADD TO CART</button> */}
                </div>
              </div>
            ))}
          </div>
          <div className=" p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>

          {/* </div> */}

        </div>
      </Layout >
    </>
  );
};

export default HomePage;