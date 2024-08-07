import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import Alert from "@mui/material/Alert";

const ProductForm = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      quantity: "",
      pictures: [],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Must be at least 3 characters")
        .required("Required"),
      price: Yup.number().required("Required"),
      quantity: Yup.number().required("Required"),
      pictures: Yup.mixed().required("Required"),
    }),
    onSubmit: async (values) => {
      setError(null);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("quantity", values.quantity);
      values.pictures.forEach((file) => {
        formData.append("pictures", file);
      });

      try {
        const response = await fetch("http://localhost:8080/api/product", {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Product created successfully", data.product);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Server error");
      }
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.map((file) => URL.createObjectURL(file)));
    formik.setFieldValue("pictures", files);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" gutterBottom>
          Add Product
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            Upload Pictures
            <input
              type="file"
              name="pictures"
              hidden
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          {images.length > 0 && (
            <Grid container spacing={2}>
              {images.map((image, index) => (
                <Grid item xs={4} key={index}>
                  <img
                    src={image}
                    alt={`preview ${index}`}
                    style={{ width: "100%" }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ProductForm;
