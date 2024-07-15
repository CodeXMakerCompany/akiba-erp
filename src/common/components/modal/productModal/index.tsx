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
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setMediaPreview
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const presaleCategory = "6686eb8fdeb4b13ca3cd1226"
const tournamentsCategory = "668b2a5ed5f0b7e8a77d37ef"
export const categoriesWithSubcategories = ["63c85a8813e30d984af3fb3a", "63c85a8d13e30d984af3fb3c", presaleCategory, tournamentsCategory]

export const Label = styled('label')`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const ProductSale = () => {
  const {
    upload: { mediaPreview },
    modal: { categories },
    product: { activeProduct },
  } = useSelector((state: RootState) => state);
  
  const [productForm, setProductForm] = useState<ProductPayloadProps>({
    category: "63c859ee13e30d984af3fb2e",
    subcategory: "",
    name: "",
    image: "",
    stock: 0,
    customerPrice: 0,
    purchasePrice: 0,
    initialPayment: undefined,
    launchDate: undefined
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
      {categoriesWithSubcategories.includes(
        productForm.category
      ) ? (
        <Box mt={4}>
          <FormControl fullWidth>
            <Label id="demo-simple-select-label">
              Tcg Sub-Category
            </Label>
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

      {
        presaleCategory.includes(
          productForm.category
        ) ? <Box mt={4}>
          <Label id="demo-simple-select-label">
            Pre-Sale Launch Date
          </Label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Pre-Sale Launch Date"
              onChange={(e: any) => {
                setProductForm({ ...productForm, launchDate: e.$d })
              }}
              defaultValue={dayjs(new Date())}
            />
          </LocalizationProvider>
        </Box> : null
      }

      <FormControl fullWidth>
        {
          presaleCategory.includes(
            productForm.category
          ) ?
            <>
              <Label id="demo-simple-select-label">
                Initial Payment
              </Label>
              <TextField
                hiddenLabel
                id="initialPayment"
                defaultValue=""
                variant="filled"
                size="small"
                placeholder="Required Initial Payment"
                className="custom-modal-form-field"
                value={productForm.initialPayment}
                onChange={({ target }) =>
                  setProductForm({ ...productForm, initialPayment: parseFloat(target.value) })
                }
              />
            </>
            : null
        }


        <Label id="demo-simple-select-label">
          Name
        </Label>
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
        <Label id="demo-simple-select-label">
          Stock
        </Label>
        <TextField
          id="stock-input"
          variant="filled"
          size="small"
          type="number"
          className="custom-modal-form-field"
          value={productForm.stock}
          onChange={({ target }) =>
            setProductForm({ ...productForm, stock: parseFloat(target.value) })
          }
        />
        <Label id="demo-simple-select-label">
          Purchase price
        </Label>
        <TextField
          id="purchase-input"
          variant="filled"
          size="small"
          type="number"
          className="custom-modal-form-field"
          value={productForm.purchasePrice}
          onChange={({ target }) =>
            setProductForm({
              ...productForm,
              purchasePrice: parseFloat(target.value),
            })
          }
        />
         <Label id="demo-simple-select-label">
          Sell price
        </Label>
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
