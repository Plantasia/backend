 import {Comment} from '@entities/comments.entity'
 
 export default class FindAllCommentsModel{
  comments: Comment[];
  currentPage: string;
  perPage: number;
  prevPage: number;
  nextPage: number;
  totalRegisters:number;
 }