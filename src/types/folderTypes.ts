export interface Folder {
  id: string;
  name: string;
  selected: boolean;
  type: 'folder';
}

export interface FolderUnitItem {
  id: string;
  name: string;
}

export interface Ancestor {
  id: string | null;
  name: string;
}
