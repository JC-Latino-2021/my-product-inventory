import { useState, useEffect } from "react";
import { getAllProducts } from "../api/productsApi";
import ProductCard from "../components/ProductCard";
import { ProductType } from "../types/product";
import styled from "styled-components";
import './Home.css'

const ProductSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-end;
  align-items: center;
`;

const Home = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="Top-Banner-Container">
        <div className="Text-Container">
          <div className="Banner-Title">Make your mark</div>
          <div className="Banner-Text">A brand New-Collection of Elevated Fan Gear...</div>
          <a href="#nogo" className='Banner-Button'>Shop Now</a>
        </div>
      </div>
      <div className="Product-Section-Title">Our Best Sellers</div>
      <ProductSection>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
            category={product.category}
          />
        ))}  
      </ProductSection>
      <div className="Footer">Copyright ©2024 JCL-Shop. Toronto, Ontario, Canada.</div>
    </>
  );
};

export default Home;