import React from 'react';
import './FilterBar.css';

const FilterBar = ({ filters, onFilterChange }) => {
    return (
        <div className="filter-bar">
            <input
                type="text"
                placeholder="Search product..."
                value={filters.search}
                onChange={(e) => onFilterChange('search', e.target.value)}
            />
            <input
                type="number"
                placeholder="Search by Price"
                value={filters.price}
                onChange={(e) => onFilterChange('price', e.target.value)}
            />

        </div>
    );
};

export default FilterBar;
