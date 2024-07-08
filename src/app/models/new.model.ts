export interface NEW {
  id: string;
  title: string;
  category: string;
  time: string;
  date: string;
}

export interface FilterOption {
  category?: string;
  status?: string;
  role?: string;
  subCategory?: string;
  orderCategory?: string;
  orderSubCategory?: string;
}
