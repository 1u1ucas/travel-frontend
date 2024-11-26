import { CommentType } from '../../types/comment.type';


 
 interface CommentCardProps {
    comment: CommentType;
}
 
 
 function CommentCard ({ comment }: CommentCardProps) {

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">{comment.pseudo}</h2>
            <p className="text-sm text-gray-600">{comment.updatedAt}</p>
            </div>
            <p className="text-gray-800 mt-2">{comment.content}</p>
        </div>
    );
  };
  
  export default CommentCard;