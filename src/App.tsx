import TravelCard from "./components/travelCard"



function App() {




  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
    <h1 className="text-3xl font-bold underline mb-6 text-center">
      Share your travel
    </h1>
    <TravelCard />
  </div>
  )
}

export default App