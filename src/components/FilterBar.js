import React from 'react';

export default function FilterBar({ categories, filter, setFilter }) {
  return (
    <div className="mb-3 d-flex align-items-center">
      <label className="me-2">Category:</label>
      <select className="form-select w-auto" value={filter} onChange={e => setFilter(e.target.value)}>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
}
