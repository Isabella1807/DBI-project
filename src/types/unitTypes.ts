export interface BaseUnitType {
  name: string;
  description: string;
  syncId: string;
  parentId: string | null;
}

export interface UnitTypeWithId extends BaseUnitType {
  id: string;
}

export interface unitInputType {
  name: string;
  description: string;
  syncId: string;
}
