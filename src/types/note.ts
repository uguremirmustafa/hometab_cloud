export interface Note {
  id?: number;
  name: string;
  content?: string;
  createdAt: Date;
  updatedAt?: Date;
  isOpen: boolean;
  isActive: boolean;
  isDeleted?: boolean;
}
