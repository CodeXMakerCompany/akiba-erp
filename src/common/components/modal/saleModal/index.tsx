import {
  Autocomplete,
  Button,
  Container,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "../../../../hooks/useDebounce";
import apiInstance from "../../../../api/api";
import { createSale, fetchSales } from "../../../../redux/slices/sales/actions";
import { useDispatch, useSelector } from "react-redux";
import { updateModalStatus } from "../../../../redux/slices/modal/modal.slice";
import { RootState } from "../../../../redux/store";
const api = apiInstance();

const paymentMethods = [
  {
    value: "transfer-s",
    label: "Transfer / Sam",
  },
  {
    value: "transfer-y",
    label: "Transfer / Yazz",
  },
  {
    value: "card",
    label: "Card",
  },
  {
    value: "effective",
    label: "Effective",
  },
  {
    value: "paypal/stripe",
    label: "Paypal/Stripe",
  },
];

interface SalesForm {
  user: string;
  products: Array<any>;
  temporalSoldProducts: Array<any>;
  paymentMethod: string;
  total: number;
}

const CreateSale = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const debouncedProduct = useDebounce(searchValue, 500);
  const {
    modal: { mode },
  } = useSelector((state: RootState) => state);

  const [salesForm, setSalesform] = useState<SalesForm>({
    user: "",
    products: [],
    temporalSoldProducts: [],
    paymentMethod: "transfer",
    total: 0,
  });

  useEffect(() => {
    const fetchSearch = async () => {
      if (searchValue.length) {
        const { data } = await api.get<{ products: Array<any> }>(
          `/product/search/${debouncedProduct}`
        );

        if (data.products) {
          setSalesform({ ...salesForm, products: data?.products });
        }
      }
    };
    fetchSearch();
  }, [debouncedProduct]);

  useEffect(() => {
    setSalesform({
      ...salesForm,
      total: salesForm.temporalSoldProducts.reduce((accumulator, object) => {
        return accumulator + object.customerPrice * object.qty;
      }, 0),
    });
  }, [salesForm.temporalSoldProducts]);

  const handleChangePaymentMethod = ({
    target: { value },
  }: SelectChangeEvent<string>) => {
    setSalesform({ ...salesForm, paymentMethod: value });
  };

  const handleCreateSale = () => {
    const body = {
      user: salesForm.user,
      paymentMethod: salesForm.paymentMethod,
      products: salesForm.temporalSoldProducts.map((product) => {
        return {
          id: product._id,
          qty: product.qty,
          our_purchase_price: product.purchasePrice,
        };
      }),
      total: salesForm.total,
    };

    dispatch(createSale(body) as any);
    dispatch(updateModalStatus());
  };

  return (
    <Container>
      <FormControl fullWidth>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={
            salesForm.products && salesForm.products.length
              ? salesForm.products.map((product) => {
                  return { ...product, label: product.name };
                })
              : []
          }
          onChange={(event: any, selectedValue: any) => {
            console.log(selectedValue);

            const foundElement = salesForm.temporalSoldProducts.find(
              (product) => product._id === selectedValue._id
            );

            if (foundElement) {
              setSalesform({
                ...salesForm,
                temporalSoldProducts: salesForm.temporalSoldProducts.map(
                  (product) => {
                    if (product.name === foundElement.name) {
                      return {
                        ...product,
                        qty: product.qty + 1,
                        our_purchase_price: product.purchasePrice,
                      };
                    }
                    return product;
                  }
                ),
              });
              return;
            }

            setSalesform({
              ...salesForm,
              temporalSoldProducts: [
                ...salesForm.temporalSoldProducts,
                { ...selectedValue, qty: 1 },
              ],
            });
            // setValue(newValue);
          }}
          onInputChange={
            (event: any, newInputValue: string) => {
              setSearchValue(newInputValue);
            }

            // setInputValue(newInputValue);
          }
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Product" />}
        />

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={salesForm.paymentMethod}
          label="Payment Method"
          placeholder="Payment Method"
          onChange={handleChangePaymentMethod}
        >
          {paymentMethods.map((method, idx) => (
            <MenuItem key={idx} value={method.value}>
              {method.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {salesForm.temporalSoldProducts && salesForm.temporalSoldProducts.length
        ? salesForm.temporalSoldProducts.map((product) => (
            <div>
              {product.name} {product.qty}
            </div>
          ))
        : null}

      <TextField
        hiddenLabel
        id="field-total"
        defaultValue="0.00"
        variant="filled"
        size="small"
        value={salesForm.total}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSalesform({ ...salesForm, total: parseInt(e.target.value) });
        }}
      />

      <TextField
        hiddenLabel
        id="field-email"
        defaultValue="@gmail.com"
        variant="filled"
        size="small"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSalesform({ ...salesForm, user: e.target.value });
        }}
      />

      <Button variant="contained" onClick={handleCreateSale}>
        {mode} Sale
      </Button>
    </Container>
  );
};

export default CreateSale;
