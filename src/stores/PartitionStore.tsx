import { makeAutoObservable } from 'mobx';
import { IPartition } from '../models/types';

export class PartitionStore {
  root: IPartition | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setRoot(partition: IPartition) {
    this.root = partition;
  }
}