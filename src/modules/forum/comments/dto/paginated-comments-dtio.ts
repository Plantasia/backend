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
      updated_at?:Date;
      created_at?:Date;
      deleted_at?:Date;
    }