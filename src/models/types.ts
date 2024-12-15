export type PartitionDirection = 'horizontal' | 'vertical' | null;

export interface IPartition {
  id: string;
  color: string;
  direction: PartitionDirection;
  parent: IPartition | null;
  children: IPartition[];
  size: number;
  split(direction: PartitionDirection): void;
  remove(): void;
  updateSize(newSize: number): void;
}