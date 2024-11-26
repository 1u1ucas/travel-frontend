  import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import TravelList from "./components/Travel/travelList";
import TravelSinglePage from "./components/Travel/travelSinglePage";
import TravelForm from "./components/Travel/travelForm";
import CategoryForm from "./components/Travel/categoryForm";






function App() {
  



  return (

     <BrowserRouter>
     <nav className="bg-white shadow-md rounded-lg p-4 mb-6 w-full flex justify-center">
        <Link to="/" className="text-blue-500 hover:text-blue-700 font-bold text-lg">
          Home
        </Link>
        <Link to="/travel-form" className="text-blue-500 hover:text-blue-700 font-bold text-lg ml-4">
        Create Travel
        </Link>
        <Link to="/category-form" className="text-blue-500 hover:text-blue-700 font-bold text-lg ml-4">
        Create Category
        </Link>
      </nav>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
    <Routes>
      <Route path="/" element={<TravelList />} />
      <Route path="/:id" element={<TravelSinglePage  />} />
      <Route path="/travel-form" element={<TravelForm />} />
      <Route path="/category-form" element={<CategoryForm />} />
    </Routes>
    </div>
  </BrowserRouter>

  )
}

export default App