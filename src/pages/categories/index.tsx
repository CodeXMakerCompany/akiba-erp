import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import { useNavigation } from "react-router-dom";
import DynamicTable from "../../common/components/table";
import { InterfaceHeader } from "../../common/components/table/types";
import CategoryModal from "../../common/components/modal/index";
import { useDispatch, useSelector } from "react-redux";
import { CategoryState } from "../../redux/slices/category/category.slice";
import { ModalState, updateModalStatus } from "../../redux/slices/modal/modal.slice";
import { AppDispatch } from "../../redux/store";
import { getCategories } from "../../redux/slices/category/acions/getCategories";

const TableHeaders: Array<InterfaceHeader> = [
  { label: "Id", value: "id", align: "right" },
  { label: "Name", value: "name", align: "right" },
  { label: "Created at", value: "created_at", align: "right" },
];

const CategoriesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: { category: CategoryState }) => state.category);
  const { openModal } = useSelector((state: { modal: ModalState }) => state.modal);

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (navigation.state === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
      <h1>Categories</h1>
      <div>
        <Button variant="contained" endIcon={<Add />} onClick={() => dispatch(updateModalStatus())}>
          Add new category
        </Button>
        {navigation.state === "idle" ? (
          <DynamicTable headers={TableHeaders} data={categories} entity={"category"} />
        ) : null}
        <CategoryModal type={"Categories"} mode={"Create"} isOpen={openModal} />
      </div>
    </Container>
  );
};

export default CategoriesPage;
