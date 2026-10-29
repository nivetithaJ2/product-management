
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import "./AddProduct.css";

function AddProduct() {
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);

    const [product, setProduct] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
        description: ""
    });

    function handleChange(e) {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);

        try {
            await API.post("/products", {
                ...product,
                price: Number(product.price),
                quantity: Number(product.quantity)
            });

            alert("Product added successfully!");
            navigate("/products");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Unable to add product. Please try again."
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="add-product-page">
            <div className="add-product-heading">
                <div>
                    <h1>Add Product</h1>
                    <p>Add a new item to your inventory.</p>
                </div>

                <Link to="/products" className="back-products-link">
                    ← Back to Products
                </Link>
            </div>

            <form className="add-product-card" onSubmit={handleSubmit}>
                <div className="form-card-title">
                    <div className="form-title-icon">＋</div>
                    <div>
                        <h2>Product Details</h2>
                        <p>Enter the information for your new product.</p>
                    </div>
                </div>

                <div className="product-form-grid">
                    <div className="form-field">
                        <label htmlFor="product-name">Product Name <span>*</span></label>
                        <input
                            id="product-name"
                            name="name"
                            placeholder="e.g. Wireless Headphones"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="product-category">Category <span>*</span></label>
                        <input
                            id="product-category"
                            name="category"
                            placeholder="e.g. Electronics"
                            value={product.category}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="product-price">Price (₹) <span>*</span></label>
                        <input
                            id="product-price"
                            name="price"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Enter product price"
                            value={product.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="product-quantity">Quantity <span>*</span></label>
                        <input
                            id="product-quantity"
                            name="quantity"
                            type="number"
                            min="0"
                            step="1"
                            placeholder="Enter available quantity"
                            value={product.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-field full-width">
                        <label htmlFor="product-description">Description</label>
                        <textarea
                            id="product-description"
                            name="description"
                            placeholder="Write a short description about this product..."
                            rows="5"
                            value={product.description}
                            onChange={handleChange}
                        />
                        <small>Provide useful details about the product.</small>
                    </div>
                </div>

                <div className="form-actions">
                    <Link to="/products" className="cancel-form-button">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="save-product-button"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "✓  Save Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProduct;
