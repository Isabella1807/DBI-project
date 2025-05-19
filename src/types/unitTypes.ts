export interface BaseUnitType {
  name: string;
  description: string;
  syncId: string;
  parentId: string | null;
  userId: string;
}

export interface UnitTypeWithId extends BaseUnitType {
  id: string;
}

export interface unitInputType {
  name: string;
  description: string;
  syncId: string;
}
