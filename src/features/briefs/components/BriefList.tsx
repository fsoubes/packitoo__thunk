import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../shared/hooks";
import { getBriefs, getBriefsByProductId } from "../briefsSlice";
import BriefDetail from "./BriefDetail";
import { Routes, Route, useLocation } from "react-router-dom";
import Spinner from "../../../Components/Spinner/Spinner";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import BriefItem from "./BriefItem";

interface BriefListProps {}

const BriefList: React.FC<BriefListProps> = ({}) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { checkoutState } = useAppSelector((state) => state.briefs);
  const { products } = useAppSelector((state) => state.products);
  const [selectedId, setSelectedId] = useState<string>("");

  const briefs = useAppSelector((state) =>
    getBriefsByProductId(state, selectedId)
  );

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedId(event.target.value);
  };

  useEffect(() => {
    dispatch(getBriefs());
  }, [dispatch]);

  const briefList = briefs.map(
    ({ title, comment, productId, id }, index: number) => (
      <BriefItem
        key={index}
        id={id}
        title={title}
        comment={comment}
        // productname={products[productId - 1].name}
        productname={products[productId - 1].name}
      />
    )
  );

  return checkoutState !== "READY" ? (
    <Spinner />
  ) : (
    <div
      style={{ display: "flex", justifyContent: "space-around", width: "100%" }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Briefs</h2>

          <button
            onClick={() => setSelectedId("")}
            style={{
              maxHeight: "20px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: "red",
            }}
          >
            Clear
          </button>
        </div>
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Product</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedId}
                label="selectedId"
                onChange={handleChange}
              >
                {products &&
                  products.map((item: any, index: number) => {
                    return (
                      <MenuItem value={index} key={index}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Box>
          <ul>{briefList}</ul>
        </div>
      </div>
      <Routes>
        <Route path="briefs/:id" element={<BriefDetail />} />
      </Routes>
      {pathname === "/" && (
        <div style={{ marginTop: "3rem" }}>
          <h2>Select a brief for more detail</h2>
        </div>
      )}
    </div>
  );
};

export default BriefList;
