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
import apiInstance from "../../api/api";
import { RootState } from "../../redux/store";
import { BasePagination } from "../../common/components/pagination";

const api = apiInstance();

const TableHeaders: Array<InterfaceHeader> = [
  {
    label: "User",
    value: "_id",
    align: "center",
  },
  {
    label: "Payment Method",
    value: "payment_method",
    align: "center",
  },
  {
    label: "Total",
    value: "total",
    align: "center",
  },
  {
    label: "Earning",
    value: "net_earning",
    align: "center",
  },
  {
    label: "Realized on",
    value: "created_at",
    align: "center",
  },
];

const SalesPage = () => {
  const dispatch = useDispatch();
  const {
    modal: { openModal },
    sales: { sales },
  } = useSelector((state: RootState) => state);
  const data: any = useLoaderData();
  const navigation = useNavigation();
  console.log(data);

  console.log(sales);

  if (navigation.state === "loading") {
    return <h1>Loading...</h1>;
  }

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
          <>
            <DynamicTable
              headers={TableHeaders}
              data={sales.length ? sales : data.sales}
              entity={"sales"}
            />
            <BasePagination
              itemsPerPage={10}
              page={1}
              totalItems={data.totalDocs}
              setPage={(e: any) => console.log(e)}
              styles={{}}
            />
          </>
        ) : null}
        <SalesModal type={"Sales"} mode={"Create"} isOpen={openModal} />
      </div>
    </Container>
  );
};

export const SalesLoader = async () => {
  const salesResponse = await api.post("/sales/all", {
    page: 1,
    limit: 10,
  });

  return {
    sales: salesResponse.data?.sales,
    totalDocs: salesResponse.data?.totalDocs,
    totalPages: salesResponse.data?.totalPages,
    page: salesResponse.data?.page,
  };
};

export default SalesPage;
