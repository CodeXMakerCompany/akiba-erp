import { Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";

const CategoryModal = () => {
  const [category, setcategory] = useState("");
  const createCategory = async () => {
    const url = "http://localhost:3001/category/create";
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        name: category,
      }),
    });

    console.log(response);
  };

  return (
    <Container>
      <TextField
        label="Name"
        id="field-total"
        defaultValue=""
        variant="filled"
        size="small"
        value={category}
        onChange={(event: any) => {
          const { value } = event.target;
          setcategory(value);
        }}
      />

      <Button onClick={() => createCategory()}>Create</Button>
    </Container>
  );
};

export default CategoryModal;
