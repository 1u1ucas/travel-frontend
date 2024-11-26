import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TravelType } from '../../types/travel.type';
import Button from '../ui/Button';
import { findOneByIdTravel, removeTravel, updateTravel } from '../../service/travel.service';
import { findAllCategory } from '../../service/category.service';
import { CategoryType } from '../../types/category.type';
import CommentForm from '../comment/comment_form';
import CommentList from '../comment/comment_by_travel';



function TravelSinglePage   () {
  const { id } = useParams<{ id: string }>();
  const [travel, setTravel] = useState<Partial<TravelType>>({});
  const [editingTravel, setEditingTravel] = useState<Partial<TravelType>>({});
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    findOneByIdTravel(id).then((data) => {
      setTravel(data);
    })

    findAllCategory().then((data) => {
      setCategories(data);
    });
  }, [id]);

  if (!travel) {
    return <div>Loading...</div>;
  }

  if (!id) {
    return <div>Invalid travel ID</div>;
  }

  if (!travel) {
    return <div>Travel not found</div>;
  }

  if (!editingTravel) {
    return <div>Loading...</div>;
  }

  const handleEdit = () => {
    setEditingTravel(travel);
    return (console.log(editingTravel));
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement |HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditingTravel((prev) => ({ ...prev, [name]: value }));
  };


  const handleSave = async () => {
   updateTravel(id, editingTravel as TravelType);
   setTravel(editingTravel);
   setEditingTravel({});
   
  };

  const handleDelete = async () => {

    removeTravel(id);
    window.location.href = '/';
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold underline mb-6 text-center">
        Travel Details
      </h1>
      <div className='flex space-x-4 mb-4'>
        <Button type='button' onClick={handleEdit} variant="primary" text='Modifier'/>
        <Button type='button' onClick={handleDelete} variant="primary" text='Delete'/>
      </div>
      { editingTravel.id === travel.id ? (
        <div className="bg-white shadow-md rounded-lg p-4 w-96">
          <input type="text" name="name" value={editingTravel.name} onChange={handleChange} className="text-2xl font-bold mb-2"/>
          <input type="text" name="city" value={editingTravel.city} onChange={handleChange} className="text-gray-600 mb-2"/>
          <input type="text" name="country" value={editingTravel.country} onChange={handleChange} className="text-gray-600 mb-2"/>
          <img src={editingTravel.image} alt={editingTravel.name} className="w-full h-auto rounded-md mb-2" />
          <input
            type="text"
            name="description"
            value={editingTravel.description}
            onChange={handleChange}
            className="w-full h-12 rounded-md mb-2"
          />
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category_id">
                Category
              </label>
              <select
                id="category_id"
                name="category_id"
                value={categories.id}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a category</option>
                {categories.map((category: CategoryType) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

          <Button type='button' onClick={handleSave} variant="primary" text='Save'/>
        </div>
                
                            ) : (

        <div className="bg-white shadow-md rounded-lg p-4 w-96">
            <h2 className="text-2xl font-bold mb-2">{travel.name}</h2>
            <p className="text-gray-600 mb-2">{travel.city}, {travel.country}</p>
            <img src={travel.image} alt={travel.name} className="w-full h-auto rounded-md mb-2" />
            <p className="text-gray-700">{travel.description}</p>
            <CommentForm/>
            <CommentList/>
        </div>)}

    </div>
  );
};

export default TravelSinglePage;