import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Partition } from './models/Partition';
import { PartitionStore } from './stores/PartitionStore';
import { PartitionComponent } from './components/partition/PartitionComponent';

const App: React.FC = observer(() => {
  const [partitionStore] = useState(() => new PartitionStore());
  const [rootPartition] = useState(() => {
    const root = new Partition();
    partitionStore.setRoot(root);
    return root;
  });

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex' 
    }}>
      <PartitionComponent partition={rootPartition} />
    </div>
  );
});

export default App;