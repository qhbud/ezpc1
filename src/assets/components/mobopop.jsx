import React, { useState } from 'react';
import './mobo.css';
import ersymIcon from './ersym.svg';

function Popup({ CPUs, onSelect, onClose, selectedCPU, YCPUselected, selectedRAM, YRAMselected }) {
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
    return (YCPUselected && selectedCPU.Chipset !== cpu.Chipset) || (YRAMselected && selectedRAM.DDR !== cpu.Ram); /* this is the line giving me errors */
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
              <a href={cpu.Link} target="_blank" rel="noopener noreferrer">
  <img src={cpu.Icon} alt={cpu.name} className="MOBOgpu-icon" />
</a>
<div className="MOBOgpu-details">
  <a href={cpu.Link} target="_blank" rel="noopener noreferrer">
    <span>{cpu.name}</span>
  </a>

  <span className="symbol-column">
                  {shouldShowErsym(cpu) && (
                    <img src={ersymIcon} alt="Symbol" className="ersym-icon" />
                  )}
  </span>

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
