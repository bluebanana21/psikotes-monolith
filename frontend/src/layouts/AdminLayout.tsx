import { Children } from "react";
import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-1 p-6">
                <Outlet/>
            </main>
            
        </div>
    );
};

export default AdminLayout;