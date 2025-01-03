import React from 'react';

const TreemapItem = ({ label, value, color, x, y, width, height }) => {
  // Ensure the content stays within bounds
  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: color,
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
        padding: '8px',
        overflow: 'hidden',
        color: 'white',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <div style={{ fontWeight: '500' }}>{label}</div>
      <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>${value}</div>
    </div>
  );
};

const Treemap = ({ data }) => {
  // Normalize and validate data
  const processedData = React.useMemo(() => {
    const defaultData = Array(8).fill(null).map((_, i) => ({
      label: `Category ${i + 1}`,
      value: 10
    }));

    if (!Array.isArray(data) || data.length === 0) {
      return defaultData;
    }

    const paddedData = [...data];
    while (paddedData.length < 8) {
      paddedData.push({
        label: `Category ${paddedData.length + 1}`,
        value: 10
      });
    }
    return paddedData.slice(0, 8).map(item => ({
      ...item,
      value: Number(item.value) || 0
    }));
  }, [data]);

  const colors = [
    '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd',
    '#1d4ed8', '#3b82f6', '#60a5fa', '#93c5fd'
  ];

  // Sort data by value
  const sortedData = [...processedData].sort((a, b) => b.value - a.value);

  // Calculate layout
  const layout = React.useMemo(() => {
    const total = sortedData.reduce((sum, item) => sum + item.value, 0);
    
    // First row (2 items, 50% height)
    const firstRow = sortedData.slice(0, 2);
    const firstRowTotal = firstRow.reduce((sum, item) => sum + item.value, 0);
    let currentX = 0;
    const firstRowItems = firstRow.map(item => {
      const width = (item.value / firstRowTotal) * 100;
      const rect = {
        ...item,
        x: currentX,
        y: 0,
        width,
        height: 50
      };
      currentX += width;
      return rect;
    });

    // Second row (3 items, 25% height)
    const secondRow = sortedData.slice(2, 5);
    const secondRowTotal = secondRow.reduce((sum, item) => sum + item.value, 0);
    currentX = 0;
    const secondRowItems = secondRow.map(item => {
      const width = (item.value / secondRowTotal) * 100;
      const rect = {
        ...item,
        x: currentX,
        y: 50,
        width,
        height: 25
      };
      currentX += width;
      return rect;
    });

    // Third row (3 items, 25% height)
    const thirdRow = sortedData.slice(5, 8);
    const thirdRowTotal = thirdRow.reduce((sum, item) => sum + item.value, 0);
    currentX = 0;
    const thirdRowItems = thirdRow.map(item => {
      const width = (item.value / thirdRowTotal) * 100;
      const rect = {
        ...item,
        x: currentX,
        y: 75,
        width,
        height: 25
      };
      currentX += width;
      return rect;
    });

    return [...firstRowItems, ...secondRowItems, ...thirdRowItems];
  }, [sortedData]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      paddingBottom: '66.667%', // 2:3 aspect ratio
      backgroundColor: '#f3f4f6',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}>
        {layout.map((item, index) => (
          <TreemapItem
            key={item.label + index}
            {...item}
            color={colors[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default Treemap;