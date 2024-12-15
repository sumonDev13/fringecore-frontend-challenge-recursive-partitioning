import React from 'react';

interface PartitionControlsProps {
  onVerticalSplit: () => void;
  onHorizontalSplit: () => void;
  onRemove?: () => void;
}

export const PartitionControls: React.FC<PartitionControlsProps> = ({ 
  onVerticalSplit, 
  onHorizontalSplit, 
  onRemove 
}) => {
  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '5px',
    left: '5px',
    zIndex: 10
  };

  return (
    <div style={buttonStyle}>
      <button onClick={onVerticalSplit}>V</button>
      <button onClick={onHorizontalSplit}>H</button>
      {onRemove && <button onClick={onRemove}>-</button>}
    </div>
  );
};