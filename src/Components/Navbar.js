import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const [currentUser] = useAuthState(auth);
  const signUserOut = async () => {
    await signOut(auth);
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Home </Link>
        {!currentUser ? (
          <Link to="/login"> Login </Link>
        ) : (
          <Link to="createpost">Create Post</Link>
        )}
      </div>
      <div className="user">
        {currentUser && (
          <>
            <p>{currentUser?.displayName}</p>
            <img
              src={currentUser?.photoURL || ""}
              width="20"
              height="20"
              alt="USER IMG"
            />
            <button onClick={signUserOut}>Log out</button>
          </>
        )}
      </div>
    </div>
  );
};
