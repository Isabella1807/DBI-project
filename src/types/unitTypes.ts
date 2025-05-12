export interface BaseUnitType {
  name: string;
  description: string;
  syncId: string;
  parentId: string;
}

export interface UnitTypeWithId extends BaseUnitType {
  id: string;
}
