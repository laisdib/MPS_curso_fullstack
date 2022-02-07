import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";


function CreatePost() {
  const { authState } = useContext(AuthContext);
  let history = useHistory();
  const initialValues = {
    title: "",
    postText: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
  });

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      history.push("/");
    });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
        <h1> Create a Post </h1>
          <label>Title: </label>
          <ErrorMessage name="Title" component="span" />
          <Field
            id="inputCreatePost"
            name="title"
            placeholder="Enter a title"
          />
          <label>Post: </label>
          <ErrorMessage name="Post Text" component="span" />
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="Enter your post"
          />

          <button type="submit"> Create Post </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
