import { useState } from "react";
import { CategoryType } from "../../types/category.type";
import { createCategory } from "../../service/category.service";



function TravelForm() {
    const [formData, setFormData] = useState<Partial<CategoryType>>({});
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
          
        });
        console.log(formData) 
      };
    
        const handleSubmit = async () => {
          createCategory(formData as CategoryType);
        };
    
      return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-bold underline mb-6 text-center">
            Create Travel
          </h1>
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nom
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
            <div>
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
                Create Category
              </button>
            </div>
          </form>
        </div>
      );
    };
    
    export default TravelForm;

