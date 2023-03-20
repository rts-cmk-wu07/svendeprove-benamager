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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <Outlet />
        </motion.main>
      </>
    </AnimatePresence>
  );
}
