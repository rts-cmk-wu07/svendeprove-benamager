import { FiSearch } from "react-icons/fi"
import { Link } from "react-router-dom";

export default function InfoCard({ icon: Icon, title, description, className, linkText, linkTo }) {
  return (
    <div className={`text-center flex items-center flex-col text-white ${className}`}>
      <Icon size="40" className="mb-6" />
      <p className="text-lg mb-3">{title}</p>
      <hr className="bg-white opacity-30 h-[2px] border-none w-[50%] mb-3"></hr>
      <p className="text-base">{description}</p>
      {linkTo && <Link to={linkTo} className="bg-white mx-auto text-primary p-4 text-center rounded-2xl text-base inline-block w-[70%] mt-7">{linkText}</Link>}
    </div>
  );
}