import React from "react";
import { useNavigate } from "react-router-dom";

interface BriefItemProps {
  title: string;
  comment: string;
  productname?: string;
  id: number;
}

const BriefItem: React.FC<BriefItemProps> = ({
  title,
  comment,
  productname,
  id,
}) => {
  let navigate = useNavigate();

  return (
    <li onClick={() => navigate(`/briefs/${id}`)} style={{ cursor: "pointer" }}>
      <h2>Title: {title}</h2>
      <div>Comment: {comment}</div>
      <div>Product name: {productname}</div>
    </li>
  );
};
export default BriefItem;
