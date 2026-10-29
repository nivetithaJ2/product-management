
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Categories() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get("/products")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Unable to load categories:", error))
            .finally(() => setLoading(false));
    }, []);

    const categories = Object.values(
        products.reduce((result, product) => {
            const name = product.category?.trim();
            if (!name) return result;

            if (!result[name]) {
                result[name] = { name, count: 0, stock: 0, value: 0 };
            }

            result[name].count += 1;
            result[name].stock += Number(product.quantity) || 0;
            result[name].value +=
                (Number(product.price) || 0) *
                (Number(product.quantity) || 0);

            return result;
        }, {})
    );

    return (
        <div style={{ color: "#172b4d" }}>
            <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", gap: 16, marginBottom: 24
            }}>
                <div>
                    <h1 style={{ marginBottom: 8 }}>Categories</h1>
                    <p style={{ color: "#77849a", margin: 0 }}>
                        Organize your inventory by product category.
                    </p>
                </div>
                <Link to="/add-product" style={{
                    background: "#2878ed", color: "white",
                    padding: "12px 16px", borderRadius: 8,
                    textDecoration: "none", whiteSpace: "nowrap"
                }}>
                    + Add Product
                </Link>
            </div>

            {loading ? (
                <p>Loading categories...</p>
            ) : categories.length === 0 ? (
                <div style={{
                    background: "white", padding: 35,
                    borderRadius: 12, textAlign: "center"
                }}>
                    <h3>No categories yet</h3>
                    <p>Add a product with a category to see it here.</p>
                    <Link to="/add-product">Add your first product</Link>
                </div>
            ) : (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                    gap: 18
                }}>
                    {categories.map((item) => (
                        <div key={item.name} style={{
                            background: "white", border: "1px solid #e5eaf2",
                            borderRadius: 12, padding: 24,
                            boxShadow: "0 3px 12px rgba(20,40,80,.035)"
                        }}>
                            <div style={{
                                width: 44, height: 44, borderRadius: 10,
                                display: "grid", placeItems: "center",
                                background: "#edf4ff", color: "#2878ed",
                                fontSize: 23, marginBottom: 18
                            }}>
                                ◈
                            </div>
                            <h3 style={{ margin: "0 0 8px" }}>{item.name}</h3>
                            <p style={{ color: "#77849a", margin: "0 0 18px" }}>
                                {item.count} product{item.count !== 1 ? "s" : ""}
                            </p>
                            <div style={{
                                borderTop: "1px solid #edf0f5",
                                paddingTop: 15, display: "flex",
                                justifyContent: "space-between", gap: 8
                            }}>
                                <span style={{ color: "#77849a" }}>Total stock</span>
                                <strong>{item.stock}</strong>
                            </div>
                            <div style={{
                                display: "flex", justifyContent: "space-between",
                                gap: 8, marginTop: 12
                            }}>
                                <span style={{ color: "#77849a" }}>Inventory value</span>
                                <strong>
                                    ₹{item.value.toLocaleString("en-IN")}
                                </strong>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
