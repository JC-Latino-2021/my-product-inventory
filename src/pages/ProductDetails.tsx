import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteProduct, getProduct } from "../api/productsApi";
import { ProductType } from "../types/product";
import { BeatLoader } from "react-spinners";
import './ProductDetails.css';

const ProductDetail = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await getProduct(id);

        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      try {
        const response = await deleteProduct(id);
        if (response.status == 200) {
          console.log(response.data);
          navigate("/");
          window.alert(
            `You have successfully delete the product ${product?.title}`
          );
        }
      } catch (err) {
        console.log("Have error during the delete process", err);
      }
    }
  };

  const handleEdit = async () => {
    window.alert("Hello Edit Product");
  };

  return (
    <>
      {product ? (
        <>
          <div className="Product-Image-Container">
            <img src={product.image} alt="" className="Product-Image" width="500" height="auto" />
          </div>
          <div className="Product-Info-Container">
            <h1 className="Product-Title">{product.title}</h1>
            <p className="Product-Description">{product.description}</p>
            <p className="Product-Price">${product.price} CAD</p>
            <center>
              {/* <button onClick={() => setModalOpen(true)}>Update Product</button> */}
              <button className="Button-Styling" onClick={handleDelete}>
                {/* Delete Product */}
                {isLoading ? <p>Deleting...</p> : <p>Delete Product</p>}
              </button>
              <div></div>
              <button className="Button-Styling" onClick={handleEdit}>
                {/* Edit Product */}
                {isLoading ? <p>Editing...</p> : <p>Edit Product</p>}
              </button>
            </center>
          </div>
          <div className="Footer">Copyright ©2024 JCL-Shop. Toronto, Ontario, Canada.</div>
        </>
      ) : (
        <BeatLoader color="#36d7b7" />
      )}
    </>
  );
};

export default ProductDetail;