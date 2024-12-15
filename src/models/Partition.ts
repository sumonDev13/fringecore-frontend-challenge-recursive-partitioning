import { makeAutoObservable } from 'mobx';
import { IPartition, PartitionDirection } from './types';
import { getRandomColor } from '../utils/color';
import { generateId } from '../utils/id';

export class Partition implements IPartition {
  id: string;
  color: string;
  direction: PartitionDirection = null;
  parent: IPartition | null = null;
  children: IPartition[] = [];
  size: number = 1;

  constructor(color?: string, parent?: IPartition) {
    this.id = generateId();
    this.color = color || getRandomColor();
    this.parent = parent || null;
    makeAutoObservable(this);
  }

  split(direction: PartitionDirection) {
    if (this.children.length > 0) return;

    this.direction = direction;
    
    const child1 = new Partition(this.color, this);
    const child2 = new Partition(getRandomColor(), this);
    
    this.children = [child1, child2];
    this.color = 'transparent';
  }

  remove() {
    if (!this.parent) return;

    const index = this.parent.children.findIndex(child => child === this);
    this.parent.children.splice(index, 1);

    if (this.parent.children.length === 1) {
      const remainingChild = this.parent.children[0];
      this.parent.direction = null;
      this.parent.color = remainingChild.color;
      this.parent.children = [];
    }
  }

  updateSize(newSize: number) {
    this.size = Math.max(0.1, newSize);
  }
}