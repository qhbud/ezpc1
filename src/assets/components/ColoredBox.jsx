const ColoredBox = ({ children, backgroundColor = 'lightblue', padding = '20px', borderRadius = '8px' }) => {
  const boxStyle = {
    backgroundColor,
    padding,
    borderRadius,
    color: '#333',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  };

  return <div style={boxStyle}>{children}</div>;
};

export default ColoredBox;