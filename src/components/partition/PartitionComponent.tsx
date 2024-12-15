import React, { useMemo, useCallback, CSSProperties } from 'react';
import { observer } from 'mobx-react-lite';
import { IPartition, PartitionDirection } from '../../models/types';
import { Resizer } from '../resizer/Resizer';
import { PartitionControls } from './PartitionControls';

interface PartitionComponentProps {
  partition: IPartition;
}

export const PartitionComponent: React.FC<PartitionComponentProps> = observer(({ partition }) => {
  const containerStyle = useMemo((): CSSProperties => ({
    display: 'flex',
    flexDirection: partition.direction === 'vertical' ? 'column' : 'row',
    backgroundColor: partition.color,
    flex: partition.size,
    position: 'relative',
    minHeight: '50px',
    minWidth: '50px',
    overflow: 'hidden'
  }), [partition.direction, partition.color, partition.size]);

  const handleSplit = useCallback((direction: PartitionDirection) => {
    partition.split(direction);
  }, [partition]);

  const handleRemove = useCallback(() => {
    partition.remove();
  }, [partition]);

  const handleResize = useCallback((delta: number) => {
    const newSize = partition.size + delta / 100;
    partition.updateSize(newSize);
  }, [partition]);

  return (
    <div style={containerStyle}>
      <PartitionControls 
        onVerticalSplit={() => handleSplit('horizontal')}
        onHorizontalSplit={() => handleSplit('vertical')}
        onRemove={partition.parent ? handleRemove : undefined}
      />

      {partition.children.length > 0 && (
        <>
          {partition.children.map((child, index) => (
            <React.Fragment key={child.id}>
              <PartitionComponent partition={child} />
              {index < partition.children.length - 1 && (
                <Resizer 
                  direction={partition.direction === 'vertical' ? 'horizontal' : 'vertical'}
                  onResize={handleResize}
                />
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
});