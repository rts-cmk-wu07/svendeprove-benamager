import splashImage from "../assets/images/splash-image.jpg"
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { motion } from "framer-motion"

export default function Welcome() {
  useDocumentTitle({ title: null })

  return (
    <div className="grid h-[100dvh]">
      <img src={splashImage} alt="Image of guy dancing made with splash paint." className="grid-area-1 h-full object-cover" />
      <h1 className="grid-area-1 leading-[1.25rem] self-center translate-y-11">
        <span className="ml-11 font-roboto text-[36px] text-stroke-top uppercase tracking-tighter block">Landrup</span>
        <br />
        <span className="ml-11 font-racingSansOne text-[4.5rem] text-stroke-bottom">Dans</span>
        <hr className="border-none bg-primary h-4 w-[60%] mt-4" />
      </h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="grid-area-1 mb-[15%] self-end w-[70%] mx-auto">
        <Link to="activities" className="bg-primary mx-auto text-white p-4 text-center rounded-2xl text-base inline-block w-full">Kom i gang</Link>
      </motion.div>
    </div>
  );
}