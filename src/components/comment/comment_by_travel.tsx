import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { CommentType } from '../../types/comment.type';
import { findCommentByTravelId } from '../../service/comment.service';
import CommentCard from './comment_card';



function CommentList() {

    const [commentList, setCommentList] = useState<CommentType[]>([])
    const { id } = useParams<{ id: string  }>();

    useEffect(() => {
       const data = findCommentByTravelId(id);
        data.then((res) => {
            setCommentList(res);
            console.log(res)
        })
    }, [id])


    return (
        <>
            <h1 className="text-3xl font-bold underline mb-6 text-center">
                Share your Experience
            </h1>
            <div className="flex flex-wrap justify-center gap-4 p-4">
              { commentList.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))
              }
              

            </div>
        </>
    );
}

export default  CommentList;