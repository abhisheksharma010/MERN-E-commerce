import React, { useState, useEffect } from "react";
import Layout from "../componenets/layout/Layout";
import { useNavigate } from "react-router-dom";
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
  const handleFilter = (value, id) => {
    let all = [id];

    setChecked(all);
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
        <div className="vh-50 vw-80 banner m-5">
          <Image src="/images/homebg.jpg" fluid wid />

        </div>
        <div class="container center">
          <div class="row">
            <div class="col">
              <Image src="/images/homebg.jpg" fluid wid />
              Mens
            </div>
            <div class="col">
              <Image src="/images/homebg.jpg" fluid wid />
              Womens
            </div>
            <div class="col">
              <Image src="/images/homebg.jpg" fluid wid />
              CHildrens
            </div>
          </div>
        </div>


        <div className="container-fluid row mt-3">
          <div className="col-md-2">
            <h4 className="text-center">Filter By Category</h4>
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="col-md-2">


            <div className="d-flex justify-content-between flex">
              {categories?.map((c) => (
                <span
                  key={c._id}
                  className={`text-nowrap m-4 list-group-item list-group-item-action ${checked.includes(c._id) ? 'active' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleFilter(!checked.includes(c._id), c._id)}
                >
                  {c.name}
                </span>
              ))}

            </div>

            <Button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              click
            </Button>
            <Collapse in={open}>
              <div id="example-collapse-text">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                labore wes anderson cred nesciunt sapiente ea proident.
              </div>
            </Collapse>
            {/* price filter */}

          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text"> $ {p.price}</p>
                    <button class="btn btn-primary ms-1" onClick={() => {
                      navigate(`/product/${p.slug}`)
                    }}>More Details</button>
                    <button class="btn btn-secondary ms-1" onClick={() => {
                      setCart([...cart, p]);
                      console.log(cart?.length)
                    }

                    }>ADD TO CART</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
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
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;