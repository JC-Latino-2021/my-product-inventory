import axios from "axios";
import { ProductType } from "../types/product";

const API_URL = "https://fakestoreapi.com/products";

// Get all products
const getAllProducts = () => axios.get(API_URL);

// Create a new product
const createProduct = (newItem: ProductType) =>
axios.post(API_URL, { newItem });

// Get a single product
const getProduct = (id: string) => axios.get(`${API_URL}/${id}`);

// Update a product
const updateProduct = (id: string, product: ProductType) =>
  axios.patch(`${API_URL}/${id}`, product);

// Delete a product
const deleteProduct = (id: string) => axios.delete(`${API_URL}/${id}`);



export {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};