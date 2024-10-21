import { BrowserRouter, createBrowserRouter, Link, Route, RouterProvider, Routes } from "react-router-dom";

import TravelList from "./components/travelList";
import TravelSinglePage from "./components/travelSinglePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TravelList />,
  },
  {
    path:'/:id',
    element: <TravelSinglePage/>,
  }
]);





function App() {




  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
     <BrowserRouter>
     <nav className="bg-white shadow-md rounded-lg p-4 mb-6 w-full flex justify-center">
        <Link to="/" className="text-blue-500 hover:text-blue-700 font-bold text-lg">
          Home
        </Link>
      </nav>
    <Routes>
      <Route path="/" element={<TravelList />} />
      <Route path="/:id" element={<TravelSinglePage />} />
    </Routes>
  </BrowserRouter>
  </div>
  )
}

export default App