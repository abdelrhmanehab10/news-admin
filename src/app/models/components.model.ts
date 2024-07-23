export interface ListOptions {
  isEdit: boolean;
  isEnable: boolean;
  isDelete: boolean;
  isCheckList?: boolean;
  edit: () => void;
  enable: (id: string) => void;
  delete: (id?: string) => void;
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
  isCategories?: boolean;
  isSubCategories?: boolean;
  isRoles?: boolean;
  isStatus?: boolean;
  isSearch?: boolean;
  isDelete?: boolean;
  isDraft?: boolean;

  title?: string;
  searchPlaceholder?: string;
  headerCols?: { title: string; width: number }[];
  actions?: { title: string; click: () => void; icon: string }[];
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
