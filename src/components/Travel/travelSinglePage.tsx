import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TravelType } from '../../types/travel.type';
import Button from '../ui/Button';


function TravelSinglePage   () {
  const { id } = useParams<{ id: string }>();
  const [travel, setTravel] = useState<Partial<TravelType>>({});
  const [editingTravel, setEditingTravel] = useState<Partial<TravelType>>({});

  useEffect(() => {
    const fetchTravel = async () => {
      const response = await fetch(`http://localhost:8000/travels/${id}`);
      const data = await response.json();
      setTravel(data);
    };

    fetchTravel();
  }, []);

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


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingTravel((prev) => ({ ...prev, [name]: value }));
  };


  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8000/travels/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingTravel),
      });
      if (!response.ok) {
        throw new Error('Failed to save travel');
      }
      const data = await response.json();
      setTravel(data);
      setEditingTravel({});
    } catch (error) {
      console.error('Failed to save travel:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/travels/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete travel');
      }
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to delete travel:', error);
    }
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
          <Button type='button' onClick={handleSave} variant="primary" text='Save'/>
        </div>
                
                            ) : (

        <div className="bg-white shadow-md rounded-lg p-4 w-96">
            <h2 className="text-2xl font-bold mb-2">{travel.name}</h2>
            <p className="text-gray-600 mb-2">{travel.city}, {travel.country}</p>
            <img src={travel.image} alt={travel.name} className="w-full h-auto rounded-md mb-2" />
            <p className="text-gray-700">{travel.description}</p>
        </div>)}
    </div>
  );
};

export default TravelSinglePage;