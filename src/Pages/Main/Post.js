import { db, auth } from "../../config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Post = (props) => {
  const { post } = props;
  const [currentUser] = useAuthState(auth);
  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const [like, setLike] = useState([]);
  const navigate = useNavigate();

  const addLike = async () => {
    await addDoc(likesRef, {
      userId: currentUser?.uid,
      postId: post?.id,
    });
    setLike([...like, currentUser.uid]);
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post?.id),
        where("userId", "==", currentUser?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0]?.id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      const temp = like.filter((lk) => lk != currentUser.uid);
      setLike(temp);
    } catch (err) {
      console.log(err);
    }
  };

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    const arr = [];
    setLike(
      data.docs.map((doc) => {
        arr.push(doc.data().userId);
      })
    );
    setLike(arr);
  };

  const hasUserLiked = like
    ? like.find((user) => user === currentUser?.uid)
    : false;

  useEffect(() => {
    if (currentUser === null) {
      navigate("/login");
    } else {
      getLikes();
    }
  }, []);

  return (
    <div>
      <div className="title">
        <h1>{post.Title}</h1>
      </div>
      <div className="body">
        <p>{post.Description}</p>
      </div>
      <div className="footer">
        <p>@{post.Username}</p>
        <button onClick={hasUserLiked ? removeLike : addLike}>
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {like && <p>Likes : {like?.length}</p>}
      </div>
    </div>
  );
};
