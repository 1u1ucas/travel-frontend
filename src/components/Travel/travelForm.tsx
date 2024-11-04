import { useState } from "react";
import { TravelType } from "../../types/travel.type";




function TravelForm() {
    const [formData, setFormData] = useState<Partial<TravelType>>({});
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          try {
            const response = await fetch('http://localhost:8000/travels', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            if (!response.ok) {
              throw new Error('Failed to create travel');
            }
      
            // Handle successful travel creation
            console.log('Travel created successfully');
          } catch (err) {
            if (err instanceof Error) {
              console.log(formData);
              console.error('Failed to create travel:', err);
            }
          }
        };
    
      return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-bold underline mb-6 text-center">
            Create Travel
          </h1>
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                City  
              </label>
              <input
                type="string"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
              Country
              </label>
              <input
                type="string"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                Image
              </label>
              <input
                type="string"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
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
                Create Travel
              </button>
            </div>
          </form>
        </div>
      );
    };
    
    export default TravelForm;

