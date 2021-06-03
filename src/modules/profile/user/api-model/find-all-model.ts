import { User } from "@entities/user.entity"

export  class FindAllModel{
  users?: User[];
  currentPage?: number;
  prevPage?: number;
  nextPage?: number;
  perPage?: number;
  totalRegisters?: number;
}