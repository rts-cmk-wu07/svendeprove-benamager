import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "../components/Navigation";

export default function Layout() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial="false">
      <>
        <Navigation />
        <motion.main
          key={location.key}
          initial={{ x: "50%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-50%", opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <Outlet />
        </motion.main>
      </>
    </AnimatePresence>
  );
}
