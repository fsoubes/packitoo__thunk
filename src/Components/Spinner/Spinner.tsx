import React from "react";
import "./spinner.scss";

const Spinner: React.FC = ({}) => {
  return (
    <div className="spinner">
      <div className="lds-dual-ring" />
    </div>
  );
};
export default Spinner;
