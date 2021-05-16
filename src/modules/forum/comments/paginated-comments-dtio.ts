    export default class PaginatedCommentsModel{
        public comments:Comment[]
        public currentPage: number
        public perPage: number
        public prevPage: number 
        public nextPage: number
        public totalRegisters:number
    }

    export interface CommentModel{
      id:string;
      textBody:string;
      updated_at:string;
      created_at:string;
      deleted_at:string;
    }