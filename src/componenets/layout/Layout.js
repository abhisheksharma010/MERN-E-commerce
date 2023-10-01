import React from 'react';
import Header from './Header';
import {Helmet} from "react-helmet";
import Footer from './Fotter';

const Layout = ({ children, title, description, keywords, author })  => { // Wrap children in curly braces
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        {children}
      </main>
      <Footer />
    </>
  );
};
Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Techinfoyt",
};

export default Layout;
