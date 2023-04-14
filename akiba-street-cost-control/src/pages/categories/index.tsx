import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import DynamicTable from "../../common/components/table";
import { InterfaceHeader } from "../../common/components/table/types";
import CategoryModal from "../../common/components/modal/index";
import { useDispatch, useSelector } from "react-redux";
import { CategoryState } from "../../redux/slices/category/category.slice";
import {
  ModalState,
  updateModalStatus,
} from "../../redux/slices/modal/modal.slice";

const TableHeaders: Array<InterfaceHeader> = [
  {
    label: "Id",
    value: "id",
    align: "right",
  },
  {
    label: "Name",
    value: "name",
    align: "right",
  },
  {
    label: "Created at",
    value: "created_at",
    align: "right",
  },
];

const CategoriesPage = () => {
  const data: any = useLoaderData();
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector(
    (state: { category: CategoryState }) => state.category
  );
  const { openModal } = useSelector(
    (state: { modal: ModalState }) => state.modal
  );

  const navigation = useNavigation();
  const tableData = [
    { id: "2222", name: "WIXOSS", created_at: "01" },
    { id: "2221", name: "WIXOSS", created_at: "01" },
  ];
  if (navigation.state === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      <h1>Categories</h1>
      <div>
        <Button
          variant="contained"
          endIcon={<Add />}
          onClick={() => dispatch(updateModalStatus())}
        >
          Add new category
        </Button>
        {navigation.state === "idle" ? (
          <DynamicTable
            headers={TableHeaders}
            data={data?.categories}
            entity={"category"}
          />
        ) : null}
        <CategoryModal type={"Categories"} mode={"Create"} isOpen={openModal} />
      </div>
    </Container>
  );
};

export const CategoriesLoader = async () => {
  const url = "http://localhost:3001/category/all";
  const response = await fetch(url);
  const data: any = response.json();
  return data;
};

export default CategoriesPage;
