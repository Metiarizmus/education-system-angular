export interface Organization {
  id: number;
  name: string;
  description: string;
  statusOrg: TypeOrg;
}

export enum  TypeOrg {
  PUBLIC, PRIVATE
}
