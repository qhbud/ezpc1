import React, { useState } from 'react';
import './cpu.css';

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
    <div className="CPUpopup-overlay" onClick={onClose}>
      <div className="CPUpopup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Select a CPU</h2>
        <ul className="CPUgpu-list">
          <li className="CPUgpu-header">
            <span onClick={() => requestSort('name')}>Card</span>
            <span onClick={() => requestSort('Design')}>Designer</span>
            <span onClick={() => requestSort('Single')}>MonoT</span>
            <span onClick={() => requestSort('Multi')}>MultiT</span>
            <span onClick={() => requestSort('Threads')}>Threads</span>
            <span onClick={() => requestSort('cost')}>Price</span>
          </li>
          {sortedCPUs.map((cpu) => (
            <li
              key={cpu.name}
              className="CPUgpu-item"
              onClick={() => {
                onSelect(cpu.name);
                onClose();
              }}
            >
              <img src={cpu.Icon} alt={cpu.name} className="CPUgpu-icon" />
              <div className="CPUgpu-details">
                <span>{cpu.name}</span>
                <span>{cpu.Design}</span>
                <span>{cpu.Single}</span>
                <span>{cpu.Multi}</span>
                <span>{cpu.Threads}</span>
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
