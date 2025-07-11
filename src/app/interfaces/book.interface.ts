import { Document, Model } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface IUpdateAvailabilityMethod {
  updateAvailability(quantity: number) : Promise<any>
}

export interface IBookModel extends Model<IBook, {}, IUpdateAvailabilityMethod>{}
