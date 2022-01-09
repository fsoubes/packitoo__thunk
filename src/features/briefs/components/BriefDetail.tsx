import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../shared/hooks";
import {  getBrief } from "../briefSlice";

interface BriefDetailProps {}

const BriefDetail: React.FC<BriefDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const {brief} = useAppSelector((state) => state.brief);


  useEffect(() => {
    dispatch(getBrief(id as string));
  }, [dispatch, id]);

  
  const detail ={
      "comment": brief?.comment,
      "productId": brief?.productId
  } 

  return (
    <Fragment>
       <div style={{margin:"1rem"}}>
      <h2>{brief?.title}</h2>
       <pre style={{background:"#eee", marginTop:"1.25rem", padding:"5px"}}>{JSON.stringify(detail, null, 4)}</pre>
    </div> 
    </Fragment>
  );
};

export default BriefDetail;
