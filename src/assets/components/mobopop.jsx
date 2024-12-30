import React, { useState } from 'react';
import './mobo.css';

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
    <div className="MOBOpopup-overlay" onClick={onClose}>
      <div className="MOBOpopup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Select Motherboard</h2>
        <ul className="MOBOgpu-list">
          <li className="MOBOgpu-header">
            <span onClick={() => requestSort('name')}>Storage</span>
            <span onClick={() => requestSort('Form')}>Type</span>
            <span onClick={() => requestSort('Ram')}>Ram</span>
            <span onClick={() => requestSort('Wifi')}>Wifi</span>
            <span onClick={() => requestSort('Chipset')}>Chipset</span>
            <span onClick={() => requestSort('cost')}>Price</span>
          </li>
          {sortedCPUs.map((cpu) => (
            <li
              key={cpu.name}
              className="MOBOgpu-item"
              onClick={() => {
                onSelect(cpu.name);
                onClose();
              }}
            >
              <img src={cpu.Icon} alt={cpu.name} className="MOBOgpu-icon" />
              <div className="MOBOgpu-details">
                <span>{cpu.name}</span>
                <span>{cpu.Form}</span>
                <span>{cpu.Ram}</span>
                <span>{cpu.Wifi}</span>
                <span>{cpu.Chipset}</span>
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
