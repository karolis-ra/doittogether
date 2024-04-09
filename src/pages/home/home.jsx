import { auth } from "../../firebase/clientApp";
import { useSelector, useDispatch } from "react-redux";
import { profileFormSelector } from "../../state/profileForm/selector";
import { DefaultInput } from "../../components/DefaultInput";
import { DefaultButton } from "../../components/DefaultButton";
import { CenterWrap } from "../../components/CenterWrap";
import { Navigation } from "../../components/Navigation";

export default function Home() {

  const { userInfo } = useSelector(profileFormSelector);
  return (
    <div>
      <Navigation />
      <div>wow</div>
    </div>
  );
}

