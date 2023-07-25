import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export const CreateForm = () => {
  const [currentUser] = useAuthState(auth);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    Title: yup.string().required("Please Add A title"),
    Description: yup.string().required("Please Add A description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const onCreatePost = async (data) => {
    await addDoc(postRef, {
      Title: data.Title,
      Description: data.Description,
      Username: currentUser?.displayName,
      Id: currentUser?.uid,
    });

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <div></div>
      <input placeholder="Title..." {...register("Title")} />
      <p style={{ color: "red" }}>{errors.Title?.message}</p>
      <textarea placeholder="Description" {...register("Description")} />
      <p style={{ color: "red" }}>{errors.Description?.message}</p>
      <input type="submit" />
    </form>
  );
};
