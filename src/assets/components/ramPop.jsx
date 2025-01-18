import React, { useState } from 'react';
import './ram.css';
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
    return (YMOBOselected && selectedMOBO.Ram !== cpu.DDR); /* this is the line giving me errors */
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
             <a href={cpu.Link} target="_blank" rel="noopener noreferrer">
  <img src={cpu.Icon} alt={cpu.name} className="RAMgpu-icon" />
</a>
<div className="RAMgpu-details">
  <a href={cpu.Link} target="_blank" rel="noopener noreferrer">
    <span>{cpu.name}</span>
  </a>

  <span className="symbol-column">
                  {shouldShowErsym(cpu) && (
                    <img src={ersymIcon} alt="Symbol" className="ersym-icon" />
                  )}
  </span>
  <span>{cpu.DDR}</span>
  <span>{cpu.RR}</span>
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
