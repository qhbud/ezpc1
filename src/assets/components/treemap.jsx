import React from 'react';

const TreemapItem = ({ label, value, color, x, y, width, height }) => (
  <div
    className="absolute p-2 overflow-hidden text-white"
    style={{
      backgroundColor: color,
      left: `${x}%`,
      top: `${y}%`,
      width: `${width}%`,
      height: `${height}%`
    }}
  >
    <div className="font-medium">{label}</div>
    <div className="text-sm opacity-80">{value}</div>
  </div>
);

const calculateLayout = (items, containerWidth, containerHeight) => {
  const processRow = (items, width, startX, startY, height) => {
    const rowTotal = items.reduce((sum, item) => sum + item.value, 0);
    let x = startX;
    
    return items.map(item => {
      const itemWidth = (item.value / rowTotal) * width;
      const rect = {
        ...item,
        x: (x / containerWidth) * 100,
        y: (startY / containerHeight) * 100,
        width: (itemWidth / containerWidth) * 100,
        height: (height / containerHeight) * 100
      };
      x += itemWidth;
      return rect;
    });
  };

  // First row - top 2 largest items
  const firstRow = items.slice(0, 2);
  const remainingItems = items.slice(2);
  const firstRowHeight = containerHeight * 0.5;
  
  // Second row - next 3 items
  const secondRow = remainingItems.slice(0, 3);
  const lastRow = remainingItems.slice(3);
  const secondRowHeight = containerHeight * 0.25;
  
  // Combine all rows
  return [
    ...processRow(firstRow, containerWidth, 0, 0, firstRowHeight),
    ...processRow(secondRow, containerWidth, 0, firstRowHeight, secondRowHeight),
    ...processRow(lastRow, containerWidth, 0, firstRowHeight + secondRowHeight, secondRowHeight)
  ];
};

const defaultData = [
  { label: "Category A", value: 500 },
  { label: "Category B", value: 300 },
  { label: "Category C", value: 200 },
  { label: "Category D", value: 150 },
  { label: "Category E", value: 120 },
  { label: "Category F", value: 100 },
  { label: "Category G", value: 80 },
  { label: "Category H", value: 50 }
];

const Treemap = ({ data = defaultData }) => {
  // Validate data is an array and has items
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="p-4 text-red-500">
        Please provide valid data array with label and value properties
      </div>
    );
  }

  // Ensure we have exactly 8 items
  const paddedData = [...data];
  while (paddedData.length < 8) {
    paddedData.push({ label: `Category ${paddedData.length + 1}`, value: 10 });
  }
  const finalData = paddedData.slice(0, 8);

  const colors = [
    '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd',
    '#1d4ed8', '#3b82f6', '#60a5fa', '#93c5fd'
  ];

  // Sort data by value descending
  const sortedData = [...finalData].sort((a, b) => b.value - a.value);
  const layout = calculateLayout(sortedData, 3, 2);

  return (
    <div 
      className="relative w-full"
      style={{
        paddingTop: '66.667%' // 2:3 ratio
      }}
    >
      <div className="absolute inset-0">
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