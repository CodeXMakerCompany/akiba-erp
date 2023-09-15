import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  feedInputsOptions,
  ModalState,
  updateModalStatus,
} from "../../redux/slices/modal/modal.slice";
import DynamicTable from "../../common/components/table";
import { useLoaderData, useNavigation } from "react-router-dom";
import ProductModal from "../../common/components/modal/index";
import axios from "axios";
import { ProductsState } from "../../redux/slices/products/products.slice";
import { baseURL } from "../../api/api";
const TableHeaders: Array<any> = [
  {
    label: "Image",
    value: "image",
    align: "center",
  },
  {
    label: "Name",
    value: "name",
    align: "center",
  },
  {
    label: "Precio al cliente",
    value: "customerPrice",
    align: "rigth",
  },
  {
    label: "Precio de compra",
    value: "customerPrice",
    align: "rigth",
  },
  {
    label: "Stock",
    value: "stock",
    align: "rigth",
  },
  {
    label: "Categoria",
    value: "category",
    align: "rigth",
  },
  {
    label: "Creado en",
    value: "createdAt",
    align: "rigth",
  },
];

const ProductPage = () => {
  const dispatch = useDispatch();
  const {
    modal: { openModal },
    product: { products },
  } = useSelector(
    (state: { modal: ModalState; product: ProductsState }) => state
  );
  const LoadedData: any = useLoaderData();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(feedInputsOptions(LoadedData?.categoryResponse?.categories));
  }, [useLoaderData]);

  return (
    <Container>
      <h1>Product</h1>
      <div>
        <Button
          variant="contained"
          endIcon={<Add />}
          onClick={() => dispatch(updateModalStatus())}
        >
          Add new product
        </Button>
        {navigation.state === "idle" ? (
          <DynamicTable
            headers={TableHeaders}
            data={
              (products.length && products) ||
              LoadedData?.productResponse?.products
            }
            entity={"product"}
          />
        ) : null}
        <ProductModal type={"Product"} mode={"Create"} isOpen={openModal} />
      </div>
    </Container>
  );
};

export const ProductsLoader = async () => {
  const categoryUrl = `${baseURL}/category/all`;
  const categoryResponse = await axios.get(categoryUrl);

  const productsUrl = `${baseURL}/product/all`;
  const productsResponse = await axios.get(productsUrl);

  return {
    categoryResponse: categoryResponse.data,
    productResponse: productsResponse.data,
  };
};

export default ProductPage;
