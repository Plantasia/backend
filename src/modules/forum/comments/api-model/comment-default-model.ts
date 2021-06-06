export default class CommentModel{
    id:string;
    textBody:string;
    updated_at:string | Date;
    created_at:string | Date;
    deleted_at: string | Date;
    userId: string;
    topicId: string;
    
}