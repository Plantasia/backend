 import {Comment} from '@entities/comments.entity'
 
 export  class FindAllModel{
  comments: Comment[];
  currentPage: string;
  perPage: number;
  prevPage: number;
  nextPage: number;
  totalRegisters:number;
 }