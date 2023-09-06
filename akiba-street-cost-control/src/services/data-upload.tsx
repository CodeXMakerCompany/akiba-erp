import axios from "axios";
const validFileTypes: string[] = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/jpg",
];

const uploadData = async (data: any) => {
  const url =
    "https://wo7u13x69b.execute-api.us-east-2.amazonaws.com/prod/api/upload";

  const {
    data: { image },
  }: { data: { image: string } } = await axios.post(url, data);

  return image;
};

export const singleFileUpload = async (e: any) => {
  const file = e.target.files[0];

  if (!validFileTypes.find((validation) => validation === file.type)) {
    console.warn("Validation file type error");
    return;
  }
  const form = new FormData();

  form.append("image", file);

  const res = await uploadData(form);

  return res;
};

export const multipleFilesUpload = () => {};
