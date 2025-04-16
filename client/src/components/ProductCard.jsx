import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.title}
                className="product-image"
            />
            <h2>{product.title}</h2>
            <p>₹{product.price}</p>
        </div>
    );
};

export default ProductCard;
