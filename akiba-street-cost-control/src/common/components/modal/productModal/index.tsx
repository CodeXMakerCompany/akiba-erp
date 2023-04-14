import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMediaPreview,
  UploadState,
} from "../../../../redux/slices/uploads/uploads.slice";
import {
  ModalState,
  updateModalStatus,
} from "../../../../redux/slices/modal/modal.slice";
import { singleFileUpload } from "../../../../services/data-upload";
import "../styles.css";
import { localBaseUrl } from "../../../../constants/endpoints";
import axios from "axios";
import { getAllProducts } from "../../../../redux/slices/products/products.slice";
import { AppDispatch } from "../../../../redux/store";

const ProductSale = () => {
  const [productForm, setProductForm] = useState({
    category: "63c859ee13e30d984af3fb2e",
    image: "",
    stock: 0,
    name: "",
    customerPrice: 0,
    purchasePrice: 0,
  });
  const dispatch = useDispatch<AppDispatch>();
  const {
    upload: { mediaPreview },
    modal: { categories },
  } = useSelector((state: { upload: UploadState; modal: ModalState }) => state);

  const handleCreateProduct = async () => {
    const url = `${localBaseUrl}/product/create`;
    await axios.post(url, productForm);
    await dispatch(getAllProducts());
    dispatch(updateModalStatus());
  };

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
      <FormControl fullWidth>
        <TextField
          hiddenLabel
          id="field-total"
          defaultValue=""
          variant="filled"
          size="small"
          placeholder="Name"
          className="custom-modal-form-field"
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
          onChange={({ target }) =>
            setProductForm({
              ...productForm,
              customerPrice: parseFloat(target.value),
            })
          }
        />
      </FormControl>
      <div>
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
      </div>
      <div>
        {mediaPreview && (
          <img alt="uploaded-product" width={200} src={mediaPreview} />
        )}
      </div>
      <div>
        <Button variant="contained" component="label">
          Create Product
          <input hidden onClick={handleCreateProduct} />
        </Button>
      </div>
    </Container>
  );
};

export default ProductSale;
