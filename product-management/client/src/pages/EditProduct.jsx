import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
        description: ""
    });

    useEffect(() => {
        async function getProduct() {
            try {
                const response = await API.get("/products");

                const selectedProduct = response.data.find(
                    (item) => item._id === id
                );

                if (selectedProduct) {
                    setProduct(selectedProduct);
                } else {
                    alert("Product not found");
                    navigate("/products");
                }
            } catch (error) {
                alert("Unable to fetch product");
            }
        }

        getProduct();
    }, [id, navigate]);

    function handleChange(e) {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await API.put("/products/" + id, {
                name: product.name,
                category: product.category,
                price: Number(product.price),
                quantity: Number(product.quantity),
                description: product.description
            });

            alert("Product updated successfully!");

            navigate("/products");
        } catch (error) {
            alert("Unable to update product");
        }
    }

    return (
        <div>
            <h1>Edit Product</h1>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    name="price"
                    type="number"
                    min="0"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    name="quantity"
                    type="number"
                    min="0"
                    placeholder="Quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Update Product
                </button>
            </form>
        </div>
    );
}

export default EditProduct;