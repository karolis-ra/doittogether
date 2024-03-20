import { auth } from "../../firebase/clientApp";

export default function Home() {
  const logout = async () => {
    await auth.signOut();
  };

  return (
    <div>
      <div>this is home</div>
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
