import { IPersonalDetails } from './Common';

export interface IMinifigListParams {
  page?: number;
  page_size?: number;
  min_parts?: number;
  max_parts?: number;
  in_set_num?: string;
  in_theme_id?: string;
  ordering?: string;
  search?: string;
}

export interface LegoMinifig {
  last_modified_dt: string;
  name: string;
  num_parts: number;
  set_img_url: string;
  set_num: string;
  set_url: string;
}

export interface ILegoMinifigList {
  count: number;
  next: string | null;
  previous: string | null;
  results: LegoMinifig[];
}

interface Part {
  part_num: string;
  name: string;
  part_cat_id: number;
  part_url: string;
  part_img_url: string;
  external_ids: {
    BrickLink?: string[];
    BrickOwl?: string[];
    Brickset?: string[];
    LEGO?: string[];
    Peeron?: string[];
    LDraw?: string[];
  };
  print_of: string | null;
}

interface Color {
  id: number;
  name: string;
  rgb: string;
  is_trans: boolean;
  external_ids: {
    BrickLink?: {
      ext_ids: number[];
      ext_descrs: string[][];
    };
    BrickOwl?: {
      ext_ids: number[];
      ext_descrs: string[][];
    };
    LEGO?: {
      ext_ids: number[];
      ext_descrs: string[][];
    };
    Peeron?: {
      ext_ids: (number | null)[];
      ext_descrs: string[][];
    };
    LDraw?: {
      ext_ids: number[];
      ext_descrs: string[][];
    };
  };
}

interface Result {
  id: number;
  inv_part_id: number;
  part: Part;
  color: Color;
  set_num: string;
  quantity: number;
  is_spare: boolean;
  element_id: string;
  num_sets: number;
}

export interface ILegoPartsListData {
  count: number;
  next: null | string;
  previous: null | string;
  results: Result[];
}

export interface IMinifigOrderPayload {
  minifig_id: string;
  shipping_details: IPersonalDetails;
}
