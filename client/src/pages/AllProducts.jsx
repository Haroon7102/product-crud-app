import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilterBar from '../components/FilterBar';
import './ProductListPage.css';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ search: '', price: '' });

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/cars');
            let data = res.data;

            if (filters.search) {
                data = data.filter((item) =>
                    item.name.toLowerCase().includes(filters.search.toLowerCase())
                );
            }
            if (filters.price) {
                data = data.filter((item) => item.price === parseFloat(filters.price));
            }

            setProducts(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const onFilterChange = (key, value) => {
        setFilters({ ...filters, [key]: value });
    };

    return (
        <div className="product-list-container">
            <h1>All Products</h1>

            <FilterBar filters={filters} onFilterChange={onFilterChange} />

            <table className="product-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan="3">No products found.</td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>
                                    {product.image && (
                                        <img
                                            src={`http://localhost:5000/${product.image}`}
                                            alt={product.name}
                                            width="60"
                                        />
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductListPage;
