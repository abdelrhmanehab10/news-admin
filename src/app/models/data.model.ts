export interface ContentType {
  typeId: string;
  contentType1: string;
}

export interface ContentTypeSetting {
  roleID: number;
  contentTypeID: number;
  keyID: number;
  value: boolean;
  valueMin: number;
  valueMax: number;
  keyName: string;
  contentType: string;
}

export interface SubCategory {
  sectionID: string;
  secTitle: string;
}

export interface Category {
  categoryID: string;
  name: string;
  hide: boolean;
}

export interface Album {
  galleryID: string;
  galleryTitle: string;
}

export interface ValidationRule {
  roleID: number;
  contentTypeID: number;
  keyID: number;
  value: boolean;
  valueMin: number;
  valueMax: number;
  keyName: string;
  contentType: string;
}
