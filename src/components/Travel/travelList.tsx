import { useEffect, useState } from 'react';
import { TravelType } from '../../types/travel.type';
import TravelCard from './travelCard';
import { findAllTravel } from '../../service/travel.service';
import SortByCategory from './SortByCategory';


function TravelList() {

    const [travelList, setTravelList] = useState<TravelType[]>([])
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

    const handleCategoryChange = (categoryId: number) => {
      setSelectedCategoryId(categoryId);
      // Faites quelque chose avec l'ID de la catégorie sélectionnée, par exemple, filtrer une liste d'éléments
    };

    useEffect(() => {
       const data = findAllTravel();
        data.then((res) => {
            setTravelList(res);
        })
    }, [])

    return (
        <>
        <div>
        <SortByCategory onCategoryChange={handleCategoryChange} />
        </div>
            <h1 className="text-3xl font-bold underline mb-6 text-center">
                Share your travel
            </h1>
            <div className="flex flex-wrap justify-center gap-4 p-4">

              {
                selectedCategoryId ? 
                travelList.filter((travel) => travel.category_id === selectedCategoryId).map((travel) => (
                  <TravelCard key={travel.id} travel={travel} />
                )) :
                travelList.map((travel) => (
                  <TravelCard key={travel.id} travel={travel} />
                ))
              }
              

            </div>
        </>
    );
}

export default TravelList;