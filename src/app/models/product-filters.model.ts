import { Gender } from '../enums';

export class ProductFiltersModel {
  public page: number;
  public search: string;
  public availableOnly: boolean;
  public categoryId: number;
  public gender: Gender;
  public rating: number;
  public cost: ICostRange;

  constructor({
    page = 1,
    search = '',
    availableOnly = false,
    categoryId = null,
    gender = null,
    rating = null,
    priceFrom = null,
    priceTo = null,
  } = {}) {
    this.page = page;
    this.search = search;
    this.availableOnly = availableOnly;
    this.categoryId = categoryId;
    this.gender = gender;
    this.rating = rating;
    this.cost = { from: priceFrom, to: priceTo };
  }
}

export interface ICostRange {
  from: number;
  to: number;
}
