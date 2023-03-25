import { StatusType } from './status';

export interface Todo {
  id?: number;
  name: string;
  statusId: StatusType;
  index: number;
  isDeleted?: boolean;
  dueDate?: Date;
  description?: string;
}
