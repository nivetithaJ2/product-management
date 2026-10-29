
import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

const menuItems = [
    { path: "/", label: "Dashboard", icon: "▦" },
    { path: "/products", label: "Products", icon: "▤" },
    { path: "/add-product", label: "Add Product", icon: "+" },
    { path: "/categories", label: "Categories", icon: "◈" },
    { path: "/settings", label: "Settings", icon: "⚙" },
];

export default function Layout() {
    const [adminName, setAdminName] = useState(
        () => localStorage.getItem("adminName") || "Admin"
    );

useEffect(() => {
    function updateAdminName() {
        setAdminName(
            localStorage.getItem("adminName") || "Admin"
        );
    }

    updateAdminName();

    window.addEventListener("adminProfileUpdated", updateAdminName);

    return () => {
        window.removeEventListener(
            "adminProfileUpdated",
            updateAdminName
        );
    };
}, []);

    return (
        <div className="app-layout">
            <aside className="sidebar">
                <div className="brand">
                    <span className="brand-icon">P</span>
                    <span>Product Manager</span>
                </div>

                <p className="menu-heading">MAIN MENU</p>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/"}
                            className={({ isActive }) =>
                                `nav-item ${isActive ? "active" : ""}`
                            }
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="avatar">
                        {adminName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <strong>{adminName}</strong>
                        <small>Administrator</small>
                    </div>
                </div>
            </aside>

            <main className="main-area">
                <header className="topbar">
                    <span>Product Management System</span>
                    <span className="admin-label">{adminName} ▾</span>
                </header>

                <section className="page-content">
                    <Outlet />
                </section>
            </main>
        </div>
    );
}
