import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommentType } from "../../types/comment.type";
import { createComment } from "../../service/comment.service";





function CommentForm() {
    const [formData, setFormData] = useState<Partial<CommentType>>({});
    const [comments, setComments] = useState<CommentType[]>([]);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
      if (id) {
        const currentDateTime = new Date();
      const formattedDateTime = `${currentDateTime.getFullYear()}-${String(currentDateTime.getMonth() + 1).padStart(2, '0')}-${String(currentDateTime.getDate()).padStart(2, '0')} ${String(currentDateTime.getHours()).padStart(2, '0')}:${String(currentDateTime.getMinutes()).padStart(2, '0')}:${String(currentDateTime.getSeconds()).padStart(2, '0')}`;
      setFormData((prevFormData) => ({
        ...prevFormData,
        travel_id: Number(id),
        createdAt: formattedDateTime,
        updatedAt: formattedDateTime,
      }));
      }
    }, [id]);
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement |HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
              const newComment = await createComment(formData as CommentType);
              setComments((prevComments) => [...prevComments, newComment]);
              setFormData({});
            } catch (error) {
              console.error('An error occurred:', error);
            }
          };
    
      return (
        <div className=" bg-gray-100 flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-bold underline mb-6 text-center">
            Create Comment
          </h1>
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pseudo">
              Pseudo
              </label>
              <input
                type="text"
                id="pseudo"
                name="pseudo"
                value={formData.pseudo}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                Content  
              </label>
              <input
                type="string"
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                post comment
              </button>
            </div>
          </form>
        </div>
      );
    };
    
    export default CommentForm;

