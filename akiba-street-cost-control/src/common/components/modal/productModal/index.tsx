import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setMediaPreview,
  UploadState,
} from "../../../../redux/slices/uploads/uploads.slice";

import { singleFileUpload } from "../../../../services/data-upload";
import "../styles.css";

import { AppDispatch, RootState } from "../../../../redux/store";

import { TCGSubcategories } from "../../../../constants/subcategories";
import {
  ProductPayloadProps,
  createProduct,
} from "../../../../redux/slices/products/actions/createProduct";
import { updateProduct } from "../../../../redux/slices/products/actions/updateProduct";

const ProductSale = () => {
  const {
    upload: { mediaPreview },
    modal: { categories },
    product: { activeProduct },
  } = useSelector((state: RootState) => state);

  const [productForm, setProductForm] = useState<ProductPayloadProps>({
    category: "63c859ee13e30d984af3fb2e",
    subcategory: "",
    image: "",
    stock: 0,
    name: "",
    customerPrice: 0,
    purchasePrice: 0,
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    if (activeProduct?._id) {
      return await dispatch(updateProduct(productForm));
    }

    return await dispatch(createProduct(productForm));
  };

  useEffect(() => {
    const { category, ...restOfProduct }: any = { ...activeProduct };
    if (activeProduct) {
      setProductForm({
        ...productForm,
        ...restOfProduct,
        category: category._id,
      });
    }
  }, [activeProduct]);

  return (
    <Container>
      <br />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={productForm.category}
          label="Select a category"
          onChange={({ target }) =>
            setProductForm({ ...productForm, category: target.value })
          }
        >
          {categories?.length
            ? categories.map((category: any) => (
                <MenuItem value={category._id}>{category.name}</MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
      <br />
      {["63c85a8813e30d984af3fb3a", "63c85a8d13e30d984af3fb3c"].includes(
        productForm.category
      ) ? (
        <Box mt={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Tcg Sub-Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={productForm.subcategory}
              label="Select a sub-category"
              onChange={({ target }) =>
                setProductForm({ ...productForm, subcategory: target.value })
              }
            >
              {TCGSubcategories?.length
                ? TCGSubcategories.map((subcategory: string) => (
                    <MenuItem value={subcategory}>{subcategory}</MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </Box>
      ) : null}

      <FormControl fullWidth>
        <TextField
          hiddenLabel
          id="name"
          defaultValue=""
          variant="filled"
          size="small"
          placeholder="Name"
          className="custom-modal-form-field"
          value={productForm.name}
          onChange={({ target }) =>
            setProductForm({ ...productForm, name: target.value })
          }
        />
        <TextField
          id="stock-input"
          variant="filled"
          size="small"
          type="number"
          placeholder="Stock"
          className="custom-modal-form-field"
          value={productForm.stock}
          onChange={({ target }) =>
            setProductForm({ ...productForm, stock: parseFloat(target.value) })
          }
        />

        <TextField
          id="purchase-input"
          variant="filled"
          size="small"
          type="number"
          placeholder="Purchase price"
          className="custom-modal-form-field"
          value={productForm.purchasePrice}
          onChange={({ target }) =>
            setProductForm({
              ...productForm,
              purchasePrice: parseFloat(target.value),
            })
          }
        />

        <TextField
          id="purchase-input"
          variant="filled"
          size="small"
          type="number"
          placeholder="Sell price"
          className="custom-modal-form-field"
          value={productForm.customerPrice}
          onChange={({ target }) =>
            setProductForm({
              ...productForm,
              customerPrice: parseFloat(target.value),
            })
          }
        />
      </FormControl>
      <Box mb={4}>
        <Button variant="contained" component="label">
          Base Image
          <input
            accept="image/*"
            hidden
            type="file"
            onChange={(e) =>
              singleFileUpload(e).then((res) => {
                if (res) {
                  setProductForm({
                    ...productForm,
                    image: res,
                  });
                  dispatch(setMediaPreview(res));
                }
              })
            }
          />
        </Button>
      </Box>
      <div>
        {(mediaPreview || activeProduct?.image) && (
          <img
            alt="uploaded-product"
            width={200}
            src={mediaPreview || activeProduct?.image}
          />
        )}
      </div>
      <div>
        <Button variant="contained" component="label">
          {activeProduct?._id ? "Update" : "Create"} Product
          <input hidden onClick={handleSubmit} />
        </Button>
      </div>
    </Container>
  );
};

export default ProductSale;
