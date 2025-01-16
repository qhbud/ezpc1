import React, { useState } from 'react';
import './cpu.css';
import ersymIcon from './ersym.svg';

function Popup({ CPUs, onSelect, onClose, selectedMOBO, YMOBOselected }) {
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

  const shouldShowErsym = (cpu) => {
    return YMOBOselected && cpu.Chipset !== selectedMOBO.Chipset;
  };

  return (
    <div className="CPUpopup-overlay" onClick={onClose}>
      <div className="CPUpopup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Select a CPU</h2>
        <ul className="CPUgpu-list">
          <li className="CPUgpu-header">
            <span onClick={() => requestSort('name')}>Card</span>
            <span className="symbol-column"></span>
            <span onClick={() => requestSort('Design')}>Designer</span>
            <span onClick={() => requestSort('Single')}   style={{ fontSize: '10px' }}
>Single Thread Preformance</span>
            <span onClick={() => requestSort('Multi')}   style={{ fontSize: '10px' }}
>Multi Thread Preformance </span>
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
              <a href={cpu.Link} target="_blank" rel="noopener noreferrer">
                <img src={cpu.Icon} alt={cpu.name} className="CPUgpu-icon" />
              </a>
              <div className="CPUgpu-details">
                <a href={cpu.Link} target="_blank" rel="noopener noreferrer">
                  <span>{cpu.name}</span>
                </a>
                <span className="symbol-column">
                  {shouldShowErsym(cpu) && (
                    <img src={ersymIcon} alt="Symbol" className="ersym-icon" />
                  )}
                </span>
                <span>{cpu.Design}, {cpu.Chipset}</span>
                <span>{cpu.Single}</span>
                <span>{cpu.Multi}</span>
                <span>{cpu.Threads}</span>
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