import { auth } from "../../firebase/clientApp";
import { useSelector, useDispatch } from "react-redux";
import { profileFormSelector } from "../../state/profileForm/selector";
import { DefaultInput } from "../../components/DefaultInput";
import { DefaultButton } from "../../components/DefaultButton";

export default function Home() {
  const logout = async () => {
    console.log("logout");
    await auth.signOut();
  };

  const { userInfo } = useSelector(profileFormSelector);
  console.log(userInfo);
  return (
    <div>
      <div>Hello, {userInfo.name} </div>
      <button onClick={logout}>logout</button>
      <DefaultButton to={"/createEvent"}>Sukurti įvykį</DefaultButton>
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
