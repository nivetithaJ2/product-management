
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import "./Dashboard.css";

function Dashboard() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        API.get("/products")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Unable to load products:", error));
    }, []);

    const totalProducts = products.length;
    const totalQuantity = products.reduce(
        (sum, product) => sum + Number(product.quantity || 0), 0
    );
    const totalValue = products.reduce(
        (sum, product) =>
            sum + Number(product.price || 0) * Number(product.quantity || 0), 0
    );
    const categories = new Set(products.map((product) => product.category)).size;

    const stats = [
        { icon: "▤", label: "Total Products", value: totalProducts, color: "blue" },
        { icon: "◈", label: "Categories", value: categories, color: "green" },
        { icon: "▥", label: "Total Stock", value: totalQuantity, color: "orange" },
        {
            icon: "₹",
            label: "Inventory Value",
            value: `₹${totalValue.toLocaleString("en-IN")}`,
            color: "purple"
        }
    ];

    return (
        <div className="dashboard-page">
            <div className="dashboard-heading">
                <div>
                    <h1>Dashboard</h1>
                    <p>Welcome back! Here's your product inventory overview.</p>
                </div>
                <Link to="/add-product" className="dash-primary-button">
                    + Add New Product
                </Link>
            </div>

            <div className="stats-grid">
                {stats.map((stat) => (
                    <div className="stat-card" key={stat.label}>
                        <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
                        <div>
                            <p>{stat.label}</p>
                            <h2>{stat.value}</h2>
                        </div>
                    </div>
                ))}
            </div>

            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="quick-action-grid">
                    <Link to="/add-product" className="quick-action add-action">
                        <span>＋</span>
                        <div>
                            <strong>Add New Product</strong>
                            <small>Add an item to your inventory</small>
                        </div>
                    </Link>
                    <Link to="/products" className="quick-action view-action">
                        <span>▤</span>
                        <div>
                            <strong>View All Products</strong>
                            <small>Review and manage your products</small>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="recent-products-card">
                <div className="recent-products-heading">
                    <div>
                        <h2>Recent Products</h2>
                        <p>Your inventory at a glance</p>
                    </div>
                    <Link to="/products" className="view-all-link">View All →</Link>
                </div>

                {products.length === 0 ? (
                    <div className="dashboard-empty">
                        <span>▤</span>
                        <strong>No products yet</strong>
                        <p>Add your first product to see it here.</p>
                        <Link to="/add-product" className="dash-primary-button">
                            Add Product
                        </Link>
                    </div>
                ) : (
                    <div className="dashboard-table-wrap">
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.slice(-5).reverse().map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            <div className="dashboard-product-name">
                                                <span className="product-avatar">▣</span>
                                                <div>
                                                    <strong>{product.name}</strong>
                                                    <small>{product.description || "No description"}</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="dashboard-category">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td>₹{Number(product.price).toLocaleString("en-IN")}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            ₹{(
                                                Number(product.price) * Number(product.quantity)
                                            ).toLocaleString("en-IN")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
