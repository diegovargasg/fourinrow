export interface DAOInterface {
  init(): void;
  save(): void;
  update(): void;
  delete(): void;
  getAll(): any[];
  getById(id: string): boolean;
}
