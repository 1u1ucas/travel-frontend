import { useEffect, useState } from 'react';
import { TravelType } from '../types/travel.type';
import TravelCard from './travelCard';


function TravelList() {

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
        <>
            <h1 className="text-3xl font-bold underline mb-6 text-center">
                Share your travel
            </h1>
            <div className="flex flex-wrap justify-center gap-4 p-4">
                {
                    travelList.map((travel) => (
                        <TravelCard travel={travel} key={travel.id} />
                    ))
                }
            </div>
        </>
    );
}

export default TravelList;