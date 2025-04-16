import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilterBar from '../components/FilterBar';
import './ProductListPage.css';
import { useNavigate } from 'react-router-dom';



const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ search: '', price: '' });
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({ name: '', price: '', image: null, id: null });

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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/cars/${id}`);
            fetchProducts();
        } catch (err) {
            console.error('Failed to delete product', err);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, image: file }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', formData.name);
        form.append('price', formData.price);
        if (formData.image) form.append('image', formData.image);

        try {
            if (isEdit && formData.id) {
                await axios.put(`http://localhost:5000/api/cars/${formData.id}`, form);
            } else {
                await axios.post('http://localhost:5000/api/cars', form);
            }
            setShowModal(false);
            setFormData({ name: '', price: '', image: null, id: null });
            fetchProducts();
        } catch (error) {
            console.error('Error saving product', error);
        }
    };

    const openEditModal = (product) => {
        setIsEdit(true);
        setFormData({ name: product.name, price: product.price, id: product._id, image: null });
        setShowModal(true);
    };
    const navigate = useNavigate();

    const handleAddProduct = () => {
        // eslint-disable-next-line no-undef
        navigate('/add');
    };


    return (
        <div className="product-list-container">
            <h1>Our Products</h1>
            <button className="add-button" onClick={handleAddProduct}>
                + Add Product
            </button>

            <FilterBar filters={filters} onFilterChange={onFilterChange} />

            <table className="product-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan="4">No products found.</td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>
                                    {product.image && (
                                        <img src={`http://localhost:5000/${product.image}`} alt={product.name} width="60" />
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => openEditModal(product)}>Edit</button>
                                    <button onClick={() => handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{isEdit ? 'Edit Product' : 'Add Product'}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                required
                            />
                            <input type="file" accept="image/*" onChange={handleImageChange} />
                            <div className="modal-buttons">
                                <button type="submit">{isEdit ? 'Update' : 'Add'}</button>
                                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductListPage;
