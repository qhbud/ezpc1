import React, { useState } from 'react';
import './ram.css';

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
    <div className="RAMpopup-overlay" onClick={onClose}>
      <div className="RAMpopup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Select RAM</h2>
        <ul className="RAMgpu-list">
          <li className="RAMgpu-header">
            <span onClick={() => requestSort('name')}>Card</span>
            <span onClick={() => requestSort('DDR')}>DDR</span>
            <span onClick={() => requestSort('RR')}>Refresh</span>
            <span onClick={() => requestSort('cost')}>Price</span>
          </li>
          {sortedCPUs.map((cpu) => (
            <li
              key={cpu.name}
              className="RAMgpu-item"
              onClick={() => {
                onSelect(cpu.name);
                onClose();
              }}
            >
              <img src={cpu.Icon} alt={cpu.name} className="RAMgpu-icon" />
              <div className="RAMgpu-details">
                <span>{cpu.name}</span>
                <span>{cpu.DDR}</span>
                <span>{cpu.RR}</span>
                <span>${cpu.cost}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Popup;
