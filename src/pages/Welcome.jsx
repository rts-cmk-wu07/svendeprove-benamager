import splashImage from "../assets/images/splash-image.jpg"
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="grid h-[100dvh]">
      <img src={splashImage} alt="Image of guy dancing made with splash paint." className="grid-area-1 h-full object-cover" />
      <h1 className="grid-area-1 leading-[1.25rem] self-center translate-y-11">
        <span className="ml-11 font-roboto text-[36px] text-stroke-top uppercase tracking-tighter block">Landrup</span>
        <br />
        <span className="ml-11 font-racingSansOne text-[4.5rem] text-stroke-bottom">Dans</span>
        <hr className="border-none bg-primary h-4 w-[60%] mt-4" />
      </h1>
      <Link to="activities" className="grid-area-1 bg-primary self-end w-[70%] mx-auto text-white p-4 text-center mb-[15%] rounded-2xl text-base">Kom i gang</Link>
    </div>
  );
}