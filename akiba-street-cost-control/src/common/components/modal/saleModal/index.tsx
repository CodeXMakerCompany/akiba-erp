import { Autocomplete, Container, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import debounce from "lodash.debounce";

const CreateSale = () => {
  const [salesForm, setSalesform] = useState({
    products: [],
  });
  const getSalesByKeyword = (keyword: string) => {
    debounce((query, cb) => {
      console.log(keyword);
    }, 500);
  };

  return (
    <Container>
      <FormControl fullWidth>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={salesForm.products}
          onChange={(event: any, newValue: string | null) => {
            console.log(event, newValue);

            // setValue(newValue);
          }}
          onInputChange={
            (event: any, newInputValue: string) =>
              getSalesByKeyword(event?.target?.value)
            // setInputValue(newInputValue);
          }
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Product" />}
        />
      </FormControl>
      <TextField
        hiddenLabel
        id="field-total"
        defaultValue="0.00"
        variant="filled"
        size="small"
      />
      <TextField
        hiddenLabel
        id="field-email"
        defaultValue="@gmail.com"
        variant="filled"
        size="small"
      />
    </Container>
  );
};

export default CreateSale;
