export default (status: string, message: string) => {
  switch (status) {
    case "success":
      console.log("\x1b[34m", message);
      return;

    default:
      break;
  }
};
