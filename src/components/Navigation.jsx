import { NavLink } from "react-router-dom";
import { FiHome, FiSearch, FiCalendar } from "react-icons/fi"
import { useLocation } from "react-router-dom";

const hideOnThesePaths = ["/", "/login", "/register"]

export default function Navigation() {
  const location = useLocation()
  const isDisplayed = !hideOnThesePaths.includes(location.pathname)

  return isDisplayed ? (
    <header className="fixed bottom-0 w-full drop-shadow-[0_-3px_4px_rgba(0,0,0,0.25)] z-10">
      <nav className="bg-white flex justify-between px-6 pb-1">
        <NavLink to="/activities" className="border border-black p-2 m-3 rounded-[50%]">
          <FiHome size="24" />
        </NavLink>
        <NavLink to="/search" className="border border-black p-2 m-3 rounded-[50%]">
          <FiSearch size="24" />
        </NavLink>
        <NavLink to="/calendar" className="border border-black p-2 m-3 rounded-[50%]">
          <FiCalendar size="24" />
        </NavLink>
      </nav>
    </header>
  ) : null;
}