export interface SubModuleItems {
  index: number;
  type: string;
  value: string;
}

export interface Module {
  index: number;
  moduleKey: string;
  displayName?: string;
  items: SubModuleItems[];
}

export interface TemplateFilter {
  workspaceId: string;
  isDeleted: string;
  title?: { $regex: string; $options: string };
}
