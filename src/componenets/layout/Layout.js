import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Fotter";// Import the BackToTopButton component

const Layout = ({ children, title, description, keywords, author }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const showThreshold = 200; // Adjust this value as needed
    setIsVisible(scrollY > showThreshold);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
      {isVisible && (
        <div
          className="back-to-top-button"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#007BFF",
            color: "#fff",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          &#9650; {/* Unicode character for an upward arrow */}
        </div>
      )}
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Techinfoyt",
};

export default Layout;
