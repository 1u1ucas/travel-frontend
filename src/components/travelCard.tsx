import { useEffect, useState } from 'react';
import { TravelType } from '../types/travel.type';


function TravelCard( ) {
    const [travelList, setTravelList] = useState<TravelType[]>([])

    useEffect( () => {
      fetchTravels()
      
      
    }, [])
  
    const fetchTravels = async () => {
      const response = await fetch('http://localhost:5174/travels.json')
      const data = await response.json()
      setTravelList(data)
    }

    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">   
        {
            travelList.map((travel) => (
              <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-96" key={travel.id}>
                <h2 className="text-2xl font-bold">{travel.name}</h2>
                <p>{travel.city}, {travel.country}</p>
                <img src={travel.image} alt={travel.name} className="w-auto h-auto rounded-md" />
                <p>{travel.description}</p>
              </div>
            ))
        }
        </div>
    );
    }


export default TravelCard;