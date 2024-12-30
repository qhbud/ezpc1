import React, { useState } from 'react';
import './Popup.css';

function Popup({ GPUs, onSelect, onClose }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedGPUs = React.useMemo(() => {
    if (!sortConfig.key) return GPUs;

    const sorted = [...GPUs].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted.filter((gpu) => gpu.name !== 'Select GPU');
  }, [GPUs, sortConfig]);

  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Select a GPU</h2>
        <ul className="gpu-list">
          <li className="gpu-header">
            <span onClick={() => requestSort('name')}>Card</span>
            <span onClick={() => requestSort('Release')}>Year</span>
            <span onClick={() => requestSort('Design')}>Designer</span>
            <span onClick={() => requestSort('Bench')}>Pref</span>
            <span onClick={() => requestSort('cost')}>Price</span>
          </li>
          {sortedGPUs.map((gpu) => (
            <li
              key={gpu.name}
              className="gpu-item"
              onClick={() => {
                onSelect(gpu.name);
                onClose();
              }}
            >
              <img src={gpu.Icon} alt={gpu.name} className="gpu-icon" />
              <div className="gpu-details">
                <span>{gpu.name}</span>
                <span>{gpu.Release}</span>
                <span>{gpu.Design}</span>
                <span>{gpu.Bench}</span>
                <span>${gpu.cost}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Popup;
