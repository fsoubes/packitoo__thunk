import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./brieform.scss";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { addBrief } from "../../briefs/briefsSlice";
import { getProducts } from "../../products/productsSlice";

interface BriefFormProps {}

const BriefForm: React.FC<BriefFormProps> = ({}) => {
  const dispatch = useAppDispatch();
  const [id, setId] = useState<number | null>(5);
  const [productsName, setProductsName] = useState<string[] | null>(null);
  const { products } = useAppSelector((state) => state.products);
  const briefs = useAppSelector((state) => state.briefs);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    setId(briefs.nodes.length);
  }, [briefs.nodes.length]);

  useEffect(() => {
    if (products && products.length > 0)
      setProductsName(products.map((item) => item.name));
  }, [products]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      bgcolor={"#f6f8fa"}
      width={"600px"}
      padding={"20px"}
      border={"1px solid #eaecef"}
      borderRadius={"5px"}
      marginTop={5}
      marginBottom={5}
      marginRight={2}
    >
      <div className="form__header">
        <h1>Send your brief</h1>
      </div>
      <Formik
        initialValues={{
          title: "",
          comment: "",
          product: "",
        }}
        onSubmit={async (
          { title, comment, product },
          { setErrors, resetForm }
        ) => {
          try {
            if (!title) {
              setErrors({ title: "you can't send this empty!" });
            } else if (!comment) {
              setErrors({ comment: "you can't send this empty!" });
            } else {
              console.log(product);

              dispatch(
                addBrief({
                  id: (id as number) + 1,
                  title: title,
                  comment: comment,
                  productId: product ? parseInt(product) + 1 : 1,
                })
              );
              resetForm();
            }
          } catch (err) {
            throw err;
          }
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Box
              marginBottom={2}
              marginTop={2}
              display="flex"
              flexDirection="column"
            >
              <label className="form__label">Title</label>
              <Field
                type="text"
                name="title"
                autoCapitalize="none"
                autoCorrect="off"
                className="form__input"
              ></Field>
              {errors.title && (
                <ErrorMessage name="title">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              )}
            </Box>
            <Box
              marginBottom={2}
              marginTop={2}
              display="flex"
              flexDirection="column"
            >
              <label className="form_label">Comment</label>

              <Field type="text" className="form__input" name="comment"></Field>
              {errors.comment && (
                <ErrorMessage name="comment">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              )}
            </Box>
            <Box
              marginBottom={2}
              marginTop={2}
              display="flex"
              flexDirection="column"
            >
              <label className="form__label">Products</label>
              <Field as="select" name="product" className="form__select ">
                {productsName &&
                  productsName.map((item: string, index: number) => (
                    <option value={index} key={index}>
                      {productsName[index]}
                    </option>
                  ))}
              </Field>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default BriefForm;
