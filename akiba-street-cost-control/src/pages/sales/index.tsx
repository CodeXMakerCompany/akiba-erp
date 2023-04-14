import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import DynamicTable from "../../common/components/table";
import { InterfaceHeader } from "../../common/components/table/types";
import SalesModal from "../../common/components/modal/index";
import { useDispatch, useSelector } from "react-redux";
import {
  ModalState,
  updateModalStatus,
} from "../../redux/slices/modal/modal.slice";

const TableHeaders: Array<InterfaceHeader> = [
  {
    label: "Order Id",
    value: "id",
    align: "center",
  },
  {
    label: "Category",
    value: "category",
    align: "right",
  },
  {
    label: "Customer Email",
    value: "customer_email",
    align: "right",
  },
  {
    label: "Sold on",
    value: "sale_date",
    align: "right",
  },
  // "products",
  // "qty",
  {
    label: "Total Sold",
    value: "total_value",
    align: "right",
  },
  // "operative_expenses",
  {
    label: "Guide",
    value: "tracking_guide",
    align: "right",
  },
];

const SalesPage = () => {
  const dispatch = useDispatch();
  const { openModal } = useSelector(
    (state: { modal: ModalState }) => state.modal
  );
  const data = useLoaderData();
  const navigation = useNavigation();
  console.log(data);

  if (navigation.state === "loading") {
    return <h1>Loading...</h1>;
  }
  const tableData = [
    {
      id: "0001",
      category: "cat01",
      customer_email: "codex@gmail.com",
      sale_date: "2014-",
      total_value: "34.00",
      tracking_guide: "asdads57a45d4",
    },
  ];
  return (
    <Container>
      <h1>Sales</h1>
      <div>
        <Button
          variant="contained"
          endIcon={<Add />}
          onClick={() => dispatch(updateModalStatus())}
        >
          Add new sale
        </Button>
        {navigation.state === "idle" ? (
          <DynamicTable
            headers={TableHeaders}
            data={tableData}
            entity={"sales"}
          />
        ) : null}
        <SalesModal type={"Sales"} mode={"Create"} isOpen={openModal} />
      </div>
    </Container>
  );
};

export const SalesLoader = async () => {
  const urlA = "http://localhost:3001/category/all";
  // const urlB = "http://localhost:3001/sales/all";
  const responseA = await fetch(urlA);
  console.log(responseA);

  // const responseB = await fetch(urlB);
  const categories: any = responseA.json();
  console.log(categories);

  // const sales: any = responseB.json();
  return {
    categories,
    // sales,
  };
};

export default SalesPage;
