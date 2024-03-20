import { useFormik } from "formik";
import { Form, Container, Button } from "react-bootstrap";
//import styled from "styled-components";
import * as Yup from "yup";

import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductForm.css";
import { createProduct } from "../api/productsApi";

function ProductForm() {
  const formik = useFormik({
    initialValues: {
      id: 0,
      title: "",
      price: 0,
      category: "",
      description: "",
      image: "",
    },
    validationSchema: Yup.object({      
      title: Yup.string().required("Please enter the Product Name"),
      price: Yup.number()
      .min(1, "The price should be more than $1")
      .required("Please enter the Product Price"),
      category: Yup.string().required("Please enter the Product Category"),
      description: Yup.string()
        .min(5, "The Description must be at least 5 characters")
        .max(1000, "The Description can not be more than 1,000 characters")
        .required("Please enter the Product Description"),
      image: Yup.string().url().required("Please enter a valid Image URL"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await createProduct(values);
        console.log("Product added successfully", response.data);
      } catch (err) {
        console.error("Failed to add Product", err);
      } finally {
        resetForm({});
      }
            
      window.alert("The following input below was created:\n" + "\n" + "Product Name: " + formik.values.title + ".\n" + "Product Price: " + formik.values.price + ".\n" + "Category: " + formik.values.category + ".\n" + "Description: " + formik.values.description + ".\n" + "Image Link: " + formik.values.image + ".");
    },
  });

  return (
    <Container fluid className="Product-Form">
      <div className="Form-Title">Add a Product</div>
      <Form className="Form-Container" method="post" action="#" onSubmit={formik.handleSubmit}>
        <Form.Group className="Form-Group">
          <Form.Label className="Form-Label">Product Name:</Form.Label>
          <div className="Form-Control">
              <Form.Control
              id="title"
              name="title"
              className="Form-Control-2"
              type="text"
              placeholder="Enter product name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
          </div>
          {formik.touched.title && formik.errors.title ? (
            <Form.Text className="text-muted"><div style={{textAlign:'center', color:'red', fontWeight:600}}>{formik.errors.title}</div></Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="Form-Group">
          <Form.Label className="Form-Label">Product Price:</Form.Label>
          <div className="Form-Control">
            <Form.Control
              id="price"
              name="price"
              className="Form-Control-2"
              type="price"
              placeholder="Enter price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
          </div>
          {formik.touched.price && formik.errors.price ? (
            <Form.Text className="text-muted"><div style={{textAlign:'center', color:'red', fontWeight:600}}>{formik.errors.price}</div></Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="Form-Group">
          <Form.Label className="Form-Label">Category:</Form.Label>
          <div className="Form-Control">
            <Form.Control
              id="category"
              name="category"
              className="Form-Control-2"
              type="text"
              placeholder="Enter the category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            />
          </div>
          {formik.touched.category && formik.errors.category ? (
            <Form.Text className="text-muted"><div style={{textAlign:'center', color:'red', fontWeight:600}}>{formik.errors.category}</div></Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="Form-Group">
          <Form.Label className="Form-Label">Description:</Form.Label>
          <div className="Form-Control">
            <Form.Control
              id="description"
              name="description"
              className="Form-Control-2"
              as="textarea"
              rows={3}
              cols={55}
              placeholder="Enter description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
          </div>
          {formik.touched.description && formik.errors.description ? (
            <Form.Text className="text-muted"><div style={{textAlign:'center', color:'red', fontWeight:600}}>{formik.errors.description}</div></Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="Form-Group">
          <Form.Label className="Form-Label">Image URL:</Form.Label>
          <div className="Form-Control">
            <Form.Control
              id="image"
              name="image"
              className="Form-Control-2"
              type="url"
              placeholder="Enter the image URL"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.image}
            />
          </div>
          {formik.touched.image && formik.errors.image ? (
            <Form.Text className="text-muted"><div style={{textAlign:'center', color:'red', fontWeight:600}}>{formik.errors.image}</div></Form.Text>
          ) : null}
        </Form.Group>

        <Button className="Form-Button" variant="primary" type="submit" onClick={ProductForm}>
          Submit
        </Button>
      </Form>
      <div className="Footer">Copyright ©2024 JCL-Shop. Toronto, Ontario, Canada.</div>
    </Container>
  );
}

export default ProductForm