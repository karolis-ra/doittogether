import { auth } from "../../firebase/clientApp";
import { useSelector } from "react-redux";
import { profileFormSelector } from "../../state/profileForm/selector";
export default function Home() {
  const logout = async () => {
    await auth.signOut();
  };

  const { name } = useSelector(profileFormSelector);

  return (
    <div>
      <div>Hello, {name} </div>
      <button onClick={logout}>logout</button>
    </div>
  );
}
// import { doItTogether } from "../../firebase/clientApp";
// import { collection, getDocs } from "firebase/firestore";

//   const { testD } = useSelector(homeSelector);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchData());
//   }, []);
