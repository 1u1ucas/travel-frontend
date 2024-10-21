import { useNavigate } from 'react-router-dom';


 
 interface TravelCardProps {
    travel: {
        id: number;
        name: string;
        city: string;
        country: string;
        image: string;
        description: string;
    };
}
 
 
 function TravelCard ({ travel }: TravelCardProps) {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(`/${travel.id}`);
      };

    return (
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-96">
        <h2 className="text-2xl font-bold mb-2">{travel.name}</h2>
        <p className="text-gray-600 mb-2">{travel.city}, {travel.country}</p>
        <img src={travel.image} alt={travel.name} className="w-full h-auto rounded-md mb-2" />
        <p className="text-gray-700">{travel.description}</p>
        <div>
        <button 
          onClick={handleButtonClick} 
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
        >
          View Details
        </button>
        </div>
      </div>
    );
  };
  
  export default TravelCard;