// import React, { useState, useRef } from 'react';
// import { makeAutoObservable } from 'mobx';
// import { observer } from 'mobx-react-lite';

// // Utility function for random color
// const getRandomColor = (): string => {
//   const letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };

// // MobX Store for Partition Management
// class PartitionStore {
//   root: Partition | null = null;

//   constructor() {
//     makeAutoObservable(this);
//   }

//   setRoot(partition: Partition) {
//     this.root = partition;
//   }
// }

// // Partition Class representing each partition
// class Partition {
//   id: string;
//   color: string;
//   direction: 'horizontal' | 'vertical' | null = null;
//   parent: Partition | null = null;
//   children: Partition[] = [];
//   size: number = 1;

//   constructor(color?: string, parent?: Partition) {
//     this.id = Math.random().toString(36).substr(2, 9);
//     this.color = color || getRandomColor();
//     this.parent = parent || null;
//     makeAutoObservable(this);
//   }

//   split(direction: 'horizontal' | 'vertical') {
//     // If already split, do nothing
//     if (this.children.length > 0) return;

//     this.direction = direction;
    
//     // Create two child partitions
//     const child1 = new Partition(this.color, this);
//     const child2 = new Partition(getRandomColor(), this);
    
//     this.children = [child1, child2];
//     this.color = 'transparent';
//   }

//   remove() {
//     // If this is a root partition, can't remove
//     if (!this.parent) return;

//     // Find index of this partition in parent's children
//     const index = this.parent.children.findIndex(child => child === this);
    
//     // Remove this partition
//     this.parent.children.splice(index, 1);

//     // If only one child remains after removal, promote that child
//     if (this.parent.children.length === 1) {
//       const remainingChild = this.parent.children[0];
//       this.parent.direction = null;
//       this.parent.color = remainingChild.color;
//       this.parent.children = [];
//     }
//   }

//   updateSize(newSize: number) {
//     this.size = newSize;
//   }
// }

// // Resizer Component
// const Resizer: React.FC<{ 
//   direction: 'horizontal' | 'vertical', 
//   onResize: (delta: number) => void 
// }> = ({ direction, onResize }) => {
//   const [isDragging, setIsDragging] = useState(false);

//   const resizerStyle: React.CSSProperties = {
//     position: 'absolute',
//     backgroundColor: '#ccc',
//     ...(direction === 'horizontal' 
//       ? { 
//           width: '100%', 
//           height: '5px', 
//           cursor: 'ns-resize',
//           left: 0,
//         }
//       : { 
//           width: '5px', 
//           height: '100%', 
//           cursor: 'ew-resize',
//           top: 0,
//         }
//   )};

//   const handleMouseDown = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setIsDragging(true);
    
//     const handleMouseMove = (moveEvent: MouseEvent) => {
//       if (!isDragging) return;
      
//       const delta = direction === 'horizontal' 
//         ? moveEvent.movementY 
//         : moveEvent.movementX;
      
//       onResize(delta);
//     };

//     const handleMouseUp = () => {
//       setIsDragging(false);
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   };

//   return (
//     <div 
//       style={resizerStyle}
//       onMouseDown={handleMouseDown}
//     />
//   );
// };

// // Partition Component
// const PartitionComponent: React.FC<{ partition: Partition }> = observer(({ partition }) => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const containerStyle: React.CSSProperties = {
//     display: 'flex',
//     flexDirection: partition.direction === 'vertical' ? 'column' : 'row',
//     backgroundColor: partition.color,
//     flex: partition.size,
//     position: 'relative',
//     minHeight: '50px',
//     minWidth: '50px',
//     overflow: 'hidden'
//   };

//   const buttonStyle: React.CSSProperties = {
//     position: 'absolute',
//     top: '5px',
//     left: '5px',
//     zIndex: 10
//   };

//   const handleSplit = (direction: 'horizontal' | 'vertical') => {
//     partition.split(direction);
//   };

//   const handleRemove = () => {
//     partition.remove();
//   };

//   const handleResize = (delta: number) => {
//     // Simple resize logic - adjust size based on delta
//     const newSize = Math.max(0.1, partition.size + delta / 100);
//     partition.updateSize(newSize);
//   };

//   return (
//     <div style={containerStyle} ref={containerRef}>
//       {/* Control Buttons */}
//       <div style={buttonStyle}>
//         <button onClick={() => handleSplit('vertical')}>V</button>
//         <button onClick={() => handleSplit('horizontal')}>H</button>
//         {partition.parent && (
//           <button onClick={handleRemove}>-</button>
//         )}
//       </div>

//       {/* Children or Content */}
//       {partition.children.length > 0 && (
//         <>
//           {partition.children.map((child, index) => (
//             <React.Fragment key={child.id}>
//               <PartitionComponent partition={child} />
//               {index < partition.children.length - 1 && (
//                 <Resizer 
//                   direction={partition.direction === 'vertical' ? 'horizontal' : 'vertical'}
//                   onResize={handleResize}
//                 />
//               )}
//             </React.Fragment>
//           ))}
//         </>
//       )}
//     </div>
//   );
// });

// // Main App Component
// const PartitionApp: React.FC = observer(() => {
//   const [partitionStore] = useState(() => new PartitionStore());
//   const [rootPartition] = useState(() => {
//     const root = new Partition();
//     partitionStore.setRoot(root);
//     return root;
//   });

//   return (
//     <div style={{ 
//       width: '100vw', 
//       height: '100vh', 
//       display: 'flex' 
//     }}>
//       <PartitionComponent partition={rootPartition} />
//     </div>
//   );
// });

// export default PartitionApp;