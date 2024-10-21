import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TravelType } from '../types/travel.type';


function TravelSinglePage   () {
  const { id } = useParams<{ id: string }>();
  const [travels, setTravels] = useState<TravelType[] | null>(null);

  useEffect(() => {
    const fetchTravel = async () => {
      const response = await fetch(`http://localhost:5174/travels.json`);
      const data = await response.json();
      setTravels(data);
    };

    fetchTravel();
  }, []);

  if (!travels) {
    return <div>Loading...</div>;
  }

  if (!id) {
    return <div>Invalid travel ID</div>;
  }

  const travel = travels.find((travel) => travel.id === parseInt(id));

  if (!travel) {
    return <div>Travel not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold underline mb-6 text-center">
        Travel Details
      </h1>

        <div className="bg-white shadow-md rounded-lg p-4 w-96">
            <h2 className="text-2xl font-bold mb-2">{travel.name}</h2>
            <p className="text-gray-600 mb-2">{travel.city}, {travel.country}</p>
            <img src={travel.image} alt={travel.name} className="w-full h-auto rounded-md mb-2" />
            <p className="text-gray-700">{travel.description}</p>
        </div>
    </div>
  );
};

export default TravelSinglePage;