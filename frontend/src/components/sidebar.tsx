import React, { useState } from "react";
import { MdMenuOpen, MdOutlineDashboard } from "react-icons/md";
import {
  IoHomeOutline,
  IoLogoBuffer,
  IoMenuOutline,
  IoPieChartSharp,
} from "react-icons/io5";
import { FaProductHunt, FaUserCircle } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [Open, Opened] = useState(true);
  const [ActiveItems, setActiveItems] = useState("leads");

  const sidebarItems = [
    {
      id: "Home",
      icons: <IoHomeOutline size={24} />,
      title: "Add New",
      bgColor: "bg-primary hover:bg-primary/90",
      textColor: "text-primary-foreground",
    },
    {
      id: "Home2",
      icons: <IoPieChartSharp size={24} />,
      title: "Add New",
      bgColor: "bg-primary hover:bg-primary/90",
      textColor: "text-primary-foreground",
    },
    {
      id: "Home3",
      icons: <MdOutlineDashboard size={24} />,
      title: "Add New",
      bgColor: "bg-primary hover:bg-primary/90",
      textColor: "text-primary-foreground",
    },
    {
      id: "Home4",
      icons: <CiSettings size={24} />,
      title: "Add New",
      bgColor: "bg-primary hover:bg-primary/90",
      textColor: "text-primary-foreground",
    },
    {
      id: "Home5",
      icons: <IoLogoBuffer size={24} />,
      title: "Add New",
      bgColor: "bg-primary hover:bg-primary/90",
      textColor: "text-primary-foreground",
    },
    {
      id: "Home6",
      icons: <TbReportSearch size={24} />,
      title: "Add New",
      bgColor: "bg-primary hover:bg-primary/90",
      textColor: "text-primary-foreground",
    },
  ];

  return (
    <div className="flex">
      <motion.div
        initial={{ width: Open ? 280 : 80 }}
        animate={{ width: Open ? 280 : 80 }}
        className="fixed top-0 left-0 flex-col h-screen bg-card  p-4 shadow-sm"
      >
        <button
          onClick={() => Opened(!Open)}
          className="absolute -right-3 top-6 bg-primary rounded-full p-1 text-primary-foreground shadow-sm"
          aria-label={Open ? "Collapse sidebar" : "Expand sidebar"}
        >
          {Open ? (
            <FiChevronLeft className="w-4 h-4" />
          ) : (
            <FiChevronRight className="w-4 h-4" />
          )}
        </button>

        <div className="space-y-2"> 
          {sidebarItems.map((Items) => (
            <motion.button
              key={Items.id}
              onClick={() => setActiveItems(Items.id)}
              className={`
                w-full flex items-center gap-3 p-3 rounded-lg transition-colors
                ${
                  ActiveItems === Items.id
                    ? Items.bgColor
                    : "hover:bg-secondary/50"
                }
                ${
                  ActiveItems === Items.id ? Items.textColor : "text-foreground"
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {Items.icons}
              <AnimatePresence>
                {Open && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="font-body text-body tracking-wide whitespace-nowrap"
                  >
                    {Items.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        {Open && (
          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex items-center gap-3 p-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground font-semibold">
                  JD
                </span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">John Doe</p>
                <p className="text-sm text-accent-foreground">Administrator</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
  animate={{ marginLeft: Open ? 280 : 80 }}
  className="flex-1 "
>
  <h1 className="text-heading font-heading text-foreground">
    {sidebarItems.find((Items) => Items.id === ActiveItems)?.title}
  </h1>
</motion.div>
    </div>
  );
};

export default Sidebar;
