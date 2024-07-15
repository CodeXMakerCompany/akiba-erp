import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../../../redux/slices/category/acions/createCategory";
import { createAuction } from "../../../../redux/slices/auction/action/createAuction";
import { AuctionPayloadProps } from "./types";
import { TCGSubcategories } from "../../../../constants/subcategories";
import { singleFileUpload } from "../../../../services/data-upload";
import { setMediaPreview } from "../../../../redux/slices/uploads/uploads.slice";
import { Label } from "../productModal";

import dayjs from "dayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";



const AuctionModal = () => {
  const {
    upload: { mediaPreview },
    modal: { categories },
  } = useSelector((state: RootState) => state);

  const today = new Date()

  const [auctionsForm, setAuctionsForm] = useState<AuctionPayloadProps>({
    name: "",
    category: "",
    description: "",
    startPrice: 0,
    currentHighestBid: 0,
    image: "",
    auctionStartTime: today,
    auctionEndTime: today,
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    // if (activeProduct?._id) {
    //   return await dispatch(updateProduct(productForm));
    // }

    return await dispatch(createAuction(auctionsForm));
  };

  // useEffect(() => {
  //   const { category, ...restOfProduct }: any = { ...activeProduct };
  //   if (activeProduct) {
  //     setProductForm({
  //       ...productForm,
  //       ...restOfProduct,
  //       category: category._id,
  //     });
  //   }
  // }, [activeProduct]);

  return (
    <Container>
      <br />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          value={auctionsForm.category}
          label="Select a category"
          onChange={({ target }) =>
            setAuctionsForm({ ...auctionsForm, category: target.value })
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

        <>


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
            value={auctionsForm.name}
            onChange={({ target }) =>
              setAuctionsForm({ ...auctionsForm, name: target.value })
            }
          />

          <Label id="demo-simple-select-label">
            Description
          </Label>
          <TextField
            hiddenLabel
            id="description"
            defaultValue=""
            variant="filled"
            size="small"
            placeholder="Description"
            className="custom-modal-form-field"
            value={auctionsForm.description}
            onChange={({ target }) =>
              setAuctionsForm({ ...auctionsForm, description: target.value })
            }
          />

          <Label id="demo-simple-select-label">
            Initial Price
          </Label>
          <TextField
            hiddenLabel
            id="startPrice"
            defaultValue=""
            variant="filled"
            size="small"
            placeholder="Initial Price"
            className="custom-modal-form-field"
            value={auctionsForm.startPrice}
            onChange={({ target }) =>
              setAuctionsForm({ ...auctionsForm, startPrice: parseFloat(target.value) })
            }
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Auction Start Time"
              onChange={(e: any) => {
                setAuctionsForm({ ...auctionsForm, auctionStartTime: e.toDate() });
              }}
              defaultValue={dayjs(auctionsForm.auctionStartTime)}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Auction End Time"
              onChange={(e: any) => {
                setAuctionsForm({ ...auctionsForm, auctionEndTime: e.$d });
              }}
              defaultValue={dayjs(auctionsForm.auctionEndTime)}
            />
          </LocalizationProvider>

        </>
      </FormControl >
      <br />

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
                  setAuctionsForm({
                    ...auctionsForm,
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
        {(mediaPreview || auctionsForm?.image) && (
          <img
            alt="uploaded-product"
            width={200}
            src={mediaPreview || auctionsForm?.image}
          />
        )}
      </div>
      <div>

        <Button onClick={() => handleSubmit()}>Create</Button>


      </div>
    </Container>
  );


};

export default AuctionModal;
