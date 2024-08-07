export interface ListOptions {
  isEdit?: boolean;
  isEnable?: boolean;
  isDelete?: boolean;
  isVersion?: boolean;
  isCheckList?: boolean;
  edit?: () => void;
  enable?: (id: string) => void;
  delete?: (id: string) => void;
  version?: (id: string) => void;
}

export interface Pagination {
  current: number;
  pages: number[];
  count: number;
}

export interface FilterOption {
  isRoles?: boolean;
  isCategories?: boolean;
  isOrderCategories?: boolean;
  isSubCategories?: boolean;
  isOrderSubCategories?: boolean;
  isStatus?: boolean;
  isType?: boolean;

  categoryId?: string;
  statusId?: string;
  roleId?: string;
  subCategoryId?: string;
  orderCategoryId?: string;
  orderSubCategoryId?: string;
  typeId?: string;
}

export interface TableOption {
  isCheckbox?: boolean;

  headerCols?: { title: string; width: number }[];
  actions?: { title: string; click: (id: number) => void; icon: string }[];
}

export interface CustomButton {
  content: string;
  bgColor: string;

  click: () => void;
}

export type Image =
  | {
      icon: string;
      title: string;
      description: string;
    }
  | File
  | undefined;

export interface Draft {
  newAutoSaveId: number;
  title: string;
  secTitle: string;
  createdDate: string;
}

export interface Section {
  SecTitle: string;
  Hide: boolean;
  WeeklySection: boolean;
  Keywords: string;
  Description: string;
  SectionId: number | null;
}

export interface Category {
  Name: string;
  Hide: boolean;
  SeoTitle: string;
  SeoKeyWords: string;
  SeoDescription: string;
}
