import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
  const [open, setOpen] = useState(false); 

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <Sidebar/>  
      <div
        className={`flex flex-col flex-1 transition-all duration-500`}
        
      >
        <main className="flex-1 p-6 mt-16 bg-slate-50">
          <div className="breadcrumbs text-sm">
            <ul>
              <li><a>Home</a></li>
              <li><a>Documents</a></li>
              <li>Add Document</li>
            </ul>
          </div>
          <Outlet />
        </main>

        <footer className="footer sm:footer-horizontal justify-center bg-slate-50 p-4">
          <aside className="flex grid-flow-col text-black">
            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
          </aside>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;