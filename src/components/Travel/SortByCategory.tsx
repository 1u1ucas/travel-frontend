import React, { useState, useEffect } from 'react';
import { findAllCategory } from '../../service/category.service';
import { CategoryType } from '../../types/category.type'; 

type SortByCategoryProps = {
  onCategoryChange: (categoryId: number) => void;
};

function SortByCategory ({ onCategoryChange }: SortByCategoryProps)  {

  const [categories, setCategories] = useState<CategoryType[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  useEffect(() => {
    findAllCategory().then((res) => {
      setCategories(res);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  return (
    <div className="my-4 flex flex-col items-start">
      <label htmlFor="category-select" className="mb-2 font-bold text-lg">Choisir une catégorie:</label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={handleChange}
        className="p-2 text-lg border border-gray-300 rounded w-full max-w-xs"
      >
        <option value="">Toutes catégories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortByCategory;