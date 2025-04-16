import React, { useState } from 'react';
import axios from 'axios';
import './AddProductPage.css';

const AddProductPage = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !image) {
            alert('Please fill all fields');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);  // Change 'title' to 'name'
        formData.append('price', price);
        formData.append('image', image);

        try {
            await axios.post('http://localhost:5000/api/cars', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Ensure this header is set
                },
            });
            alert('Product added!');
            setName('');
            setPrice('');
            setImage(null);
            setPreview(null);
        } catch (error) {
            alert('Error adding product');
            console.error(error);
        }
    };


    return (
        <div className="add-container">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit} className="add-form">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {preview && <img src={preview} alt="preview" className="image-preview" />}
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProductPage;
