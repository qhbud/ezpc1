import React, { useState } from 'react';
import './cool.css';

function Popup({ CPUs, onSelect, onClose }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedCPUs = React.useMemo(() => {
    if (!sortConfig.key) return CPUs;

    const sorted = [...CPUs].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted.filter((cpu) => cpu.name !== 'Select CPU');
  }, [CPUs, sortConfig]);

  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  return (
    <div className="COOLpopup-overlay" onClick={onClose}>
      <div className="COOLpopup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Select Cooler</h2>
        <ul className="COOLgpu-list">
          <li className="COOLgpu-header">
            <span onClick={() => requestSort('name')}>Cooler</span>
            <span onClick={() => requestSort('cost')}>Price</span>
          </li>
          {sortedCPUs.map((cpu) => (
            <li
              key={cpu.name}
              className="COOLgpu-item"
              onClick={() => {
                onSelect(cpu.name);
                onClose();
              }}
            >
<a href={cpu.Link} target="_blank" rel="noopener noreferrer">
  <img src={cpu.Icon} alt={cpu.name} className="COOLgpu-icon" />
</a>
<div className="COOLgpu-details">
  <a href={cpu.Link} target="_blank" rel="noopener noreferrer">
    <span>{cpu.name}</span>
  </a>
  <span>
  <span
    style={{
      color: cpu.disc !== 0 ? 'maroon' : 'inherit',
      textDecoration: cpu.disc !== 0 ? 'line-through' : 'none',
    }}
  >
    {cpu.cost}
  </span>
  <br />
  {cpu.disc !== 0 && <span>{cpu.disc}</span>}
</span>
</div>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Popup;
