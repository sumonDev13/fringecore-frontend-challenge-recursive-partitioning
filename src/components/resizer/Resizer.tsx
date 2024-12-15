import React, { useMemo } from 'react';
import { useDraggable } from '../../hooks/useDraggable';
import { CSSProperties } from 'react';

interface ResizerProps { 
  direction: 'horizontal' | 'vertical', 
  onResize: (delta: number) => void 
}

export const Resizer: React.FC<ResizerProps> = ({ direction, onResize }) => {
  const { handleMouseDown } = useDraggable(onResize, direction);

  const resizerStyle = useMemo((): CSSProperties => ({
    position: 'absolute',
    backgroundColor: '#ccc',
    ...(direction === 'horizontal' 
      ? { 
          width: '100%', 
          height: '5px', 
          cursor: 'ns-resize',
          left: 0,
        }
      : { 
          width: '5px', 
          height: '100%', 
          cursor: 'ew-resize',
          top: 0,
        })
  }), [direction]);

  return (
    <div 
      style={resizerStyle}
      onMouseDown={handleMouseDown}
    />
  );
};