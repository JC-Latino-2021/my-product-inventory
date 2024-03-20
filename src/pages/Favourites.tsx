import { styled } from "styled-components";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { getProduct } from "../api/productsApi";
import { ProductType } from "../types/product";

const HomePageHeader = styled.h1`
  .Title-No {
    font-size: 30px;
    line-height: 40px;
    font-weight: 600;
    font-family: "Lato", sans-serif;
    text-align: center;
    margin: 0px;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .Title-Yes {
    font-size: 30px;
    font-weight: 600;
    font-family: "Lato", sans-serif;
    margin-top: 35px;
    text-align: center;
    margin-bottom: -40px;
  }
`;

const ProductSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: flex-end;
  align-items: center;
  left: 50%;
`;

const Favourites = () => {
  const [FavouritesProducts, setFavouritesProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchFavourites = async (id: string) => {
      if (!id) {
        console.error("Product ID is undefined");
        return; // Exit the function if id is undefined
      }
      try {
        const response = await getProduct(id);
        setFavouritesProducts((prevOrderItems) => [
          ...prevOrderItems,
          response.data,
        ]);
      } catch (err) {
        console.error("Error fetching products: ", err);
      }
    };
    const FavouriteList = localStorage.getItem("favourite");
    const FavouriteListJSON: string[] = FavouriteList
      ? JSON.parse(FavouriteList)
      : null;
    FavouriteListJSON &&
      FavouriteListJSON.forEach((productId) => {
        fetchFavourites(productId);
      });
  }, []);
  return (
    <div>
      <HomePageHeader>
        {FavouritesProducts.length != 0
          ? <div className="Title-Yes">This is all your Favourites:</div>
          : <div className="Title-No">You don't have any Favourites yet,<br />please add a product from the home page...</div> }
      </HomePageHeader>
      <ProductSection>
        {FavouritesProducts.map((productItem) => (
          <ProductCard
            key={productItem.id}
            id={productItem.id}
            image={productItem.image}
            title={productItem.title}
            description={productItem.description}
            price={productItem.price}
            category={productItem.category}
          />
        ))}
      </ProductSection>
    </div>
  );
};

export default Favourites;