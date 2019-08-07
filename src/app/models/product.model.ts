import { Gender } from '../enums';

export class ProductModel {
  public id: number = null;
  public categoryId: number = null;
  public image = 'https://images.pexels.com/photos/173207/pexels-photo-173207.jpeg?auto=compress&cs=tinysrgb&w=300';
  public name: string = null;
  public description: string = null;
  public cost: number = null;
  public rating: number = null;
  public gender: Gender = null;
  public count = 0;
  public soldCount = 0;
}
