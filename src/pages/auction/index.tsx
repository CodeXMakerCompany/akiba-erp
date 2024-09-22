import { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigation } from "react-router-dom";
import { getAuction } from "../../redux/slices/auction/action/getAuctions";
import { Button, Container } from "@mui/material";
import { Add } from "@mui/icons-material";
import { ModalState, feedInputsOptions, updateModalStatus } from "../../redux/slices/modal/modal.slice";
import AuctionModal from "../../common/components/modal/index";
import DynamicTable from "../../common/components/table";
import { InterfaceHeader } from "../../common/components/table/types";
import { AuctionsState } from "../../redux/slices/auction/auction.slice";
import { baseURL } from "../../api/api";
import axios from "axios";

const TableHeaders: Array<InterfaceHeader> = [
  { label: "Id", value: "id", align: "right" },
  { label: "Name", value: "name", align: "right" },
  { label: "Created at", value: "created_at", align: "right" },
];

const AuctionPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { 
    modal: { openModal }, 
    auction: { auctions } 
  } = useSelector((state: RootState) => state);

  const LoadedData: any = useLoaderData();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(feedInputsOptions(LoadedData?.categoryResponse?.categories));
  }, [useLoaderData]);

  useEffect(() => {
    dispatch(getAuction())
  }, []);

  if (navigation.state === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <Container>
    <h1>Auctions</h1>
    <div>
      <Button variant="contained" endIcon={<Add />} onClick={() => dispatch(updateModalStatus())}>
        Add new auction
      </Button>
      {navigation.state === "idle" ? (
        <DynamicTable headers={TableHeaders} data={auctions} entity={"auction"} />
      ) : null}
      <AuctionModal type={"Auctions"} mode={"Create"} isOpen={openModal} />
    </div>
  </Container>
  )
}

export const AuctionLoader = async () => {
  const categoryUrl = `${baseURL}/category/all`;
  const categoryResponse = await axios.get(categoryUrl);
  
  return {
    categoryResponse: categoryResponse.data,
  };
};

export default AuctionPage