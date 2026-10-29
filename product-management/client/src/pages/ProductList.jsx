
    import { useEffect, useState } from "react";
    import { Link } from "react-router-dom";
    import API from "../api";
    import "./ProductList.css";

    function ProductList() {
        const [products, setProducts] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");

        async function fetchProducts() {
            try {
                setLoading(true);
                setError("");

                const response = await API.get("/products");
                setProducts(response.data);
            } catch (err) {
                setError("Unable to load products. Please check the server.");
            } finally {
                setLoading(false);
            }
        }

        useEffect(() => {
            fetchProducts();
        }, []);
    async function handleDelete(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            await API.delete(`/products/${id}`);

            setProducts((current) =>
                current.filter((product) => product._id !== id)
            );
        } catch (err) {
            alert("Unable to delete product.");
        }
    }

        const totalValue = products.reduce(
            (total, product) =>
                total + Number(product.price) * Number(product.quantity),
            0
        );

        return (
            <div className="product-page">
                <div className="product-header">
                    <div>
                        <h1>Product List</h1>
                        <p>Manage and track all your products in one place.</p>
                    </div>

                    <Link to="/add-product" className="add-product-btn">
                        + Add New Product
                    </Link>
                </div>

                <div className="product-card">
                    <h2>All Products</h2>
                    <div className="product-count">
                        {products.length} product(s) · Inventory value: ₹
                        {totalValue.toLocaleString("en-IN")}
                    </div>

                    {loading ? (
                        <div className="empty-products">Loading products...</div>
                    ) : error ? (
                        <div className="empty-products">
                            {error}
                            <br />
                            <button onClick={fetchProducts}>Try Again</button>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="empty-products">
                            <h3>No products yet</h3>
                            <p>Add your first product to see it listed here.</p>
                            <Link to="/add-product" className="add-product-btn">
                                + Add Product
                            </Link>
                        </div>
                    ) : (
                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Value</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="product-name">
                                                {product.name}
                                            </div>
                                            <small>
                                                {product.description ||
                                                    "No description"}
                                            </small>
                                        </td>
                                        <td>
                                            <span className="category-badge">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td>
                                            ₹{Number(product.price).toLocaleString("en-IN")}
                                        </td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            ₹
                                            {(
                                                Number(product.price) *
                                                Number(product.quantity)
                                            ).toLocaleString("en-IN")}
                                        </td>
                                        <td>
                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(product._id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        );
    }
    export default ProductList;