import { Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { AppDispatch } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import { createCategory } from "../../../../redux/slices/category/acions/createCategory";


const CategoryModal = () => {
  const [category, setcategory] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const onCreateCategory = async () => {
    return await dispatch(createCategory({
      name: category,
    }));
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

      <Button onClick={() => onCreateCategory()}>Create</Button>
    </Container>
  );
};

export default CategoryModal;
