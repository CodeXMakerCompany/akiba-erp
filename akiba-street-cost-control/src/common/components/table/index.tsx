import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUpTwoTone";
import {
  InterfaceHeader,
  salesAttributes,
  categoryAttributes,
  productAttributes,
} from "./types";
import { Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { updateModalStatus } from "../../../redux/slices/modal/modal.slice";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

type RowProps = {
  row: any;
  entity: string;
  options: { dispatch: Dispatch<any> };
};

const generateRowtypesAndAttributes = (entity: string) => {
  let attributes: Array<any> = [];
  let rowTypes = {};
  switch (entity) {
    case "sales":
      attributes = salesAttributes;
      break;
    case "category":
      attributes = categoryAttributes;
      break;
    case "product":
      attributes = productAttributes;
      break;
    default:
      return {};
  }

  attributes.forEach((attr) => {
    rowTypes = { ...rowTypes, [attr]: attr };
  });

  return {
    attributes,
    rowTypes,
  };
};

const MediaRow = ({ media }: { media: string }) => (
  <React.Fragment>
    <img alt={media} src={media} width={100} />
  </React.Fragment>
);
function Row({ row, entity, options: { dispatch } }: RowProps) {
  const [open, setOpen] = React.useState(false);
  const { rowTypes, attributes } = generateRowtypesAndAttributes(entity);
  const handleEdit = () => {
    dispatch(updateModalStatus({ id: row?._id, entity, mode: "Edit" }));
  };
  return (
    <React.Fragment>
      <>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {attributes
            ? attributes.map((attribute) => (
                <TableCell align="right">
                  {attribute === "image" ? (
                    <MediaRow media={row[attribute as keyof typeof rowTypes]} />
                  ) : (
                    row[attribute as keyof typeof rowTypes]
                  )}
                </TableCell>
              ))
            : null}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Record Details
                </Typography>
                <Button
                  variant="contained"
                  endIcon={<Edit />}
                  onClick={handleEdit}
                >
                  {" "}
                  Edit{" "}
                </Button>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    </React.Fragment>
  );
}
export const CollapsibleTable = ({
  headers,
  data,
  entity,
}: {
  headers: Array<InterfaceHeader>;
  data: Array<any>;
  entity: string;
}) => {
  const dispatch = useDispatch();
  console.log(data);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {headers.length
              ? headers.map((header) => (
                  <TableCell align={header.align}>{header.label}</TableCell>
                ))
              : "Table headers undetetected"}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row
              key={row.id}
              row={row}
              entity={entity}
              options={{ dispatch }}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
