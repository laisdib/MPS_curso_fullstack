import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";

function CreatePost() {
    const initialValues = {
        title: "",
        postText: "",
        username: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        username: Yup.string().min(3).max(15).required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
          //setListOfPosts(response.data);
          console.log("IT WORKED");
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
            <label>Title: </label>
            <ErrorMessage name="Title" component="span"/>
            <Field
              id="inputCreatePost"
              name="title"
              placeholder="(Ex. Title...)"
            />
            <label>Post: </label>
            <ErrorMessage name="Post Text" component="span"/>
            <Field
              id="inputCreatePost"
              name="postText"
              placeholder="(Ex. Post...)"
            />
            <label>Username: </label>
            <ErrorMessage name="Username" component="span"/>
            <Field
              id="inputCreatePost"
              name="username"
              placeholder="(Ex. John123...)"
            />

            <button type="submit"> Create Post </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
