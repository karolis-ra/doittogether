import { Link } from "react-router-dom";
import { auth } from "../../firebase/clientApp";

export default function VerifyEmail() {
  const logout = async () => {
    await auth.signOut();
  };

  return (
    <div>
      <div>please verify your email address to continue</div>
      <Link onClick={logout} to="/login">
        back
      </Link>
    </div>
  );
}
