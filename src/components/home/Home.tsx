import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const comps = [        
    { id: 1, name: "Summer Brolympics 2023", date: "August 15-20, 2023" },
    { id: 2, name: "Winter Bro Games", date: "January 5-10, 2023" },
    { id: 3, name: "Extreme Brolympics", date: "June 1-5, 2023" },
]

const Home: React.FC = () => {
    const [brols, setBrols] = useState([])

    useEffect(() => {
        setBrols(comps)
    }, [])
    
    return (
        <div className="min-h-screen bg-gray-100">
          {/* Header */}
          <header className="px-4 py-8 text-white bg-blue-600">
            <h1 className="mb-4 text-3xl font-bold text-center">Welcome to Brolympics!</h1>
          </header>
    
          {/* Description */}
          <section className="px-4 pt-4">
            <h2 className="mb-4 text-2xl font-semibold">What is Brolympics?</h2>
            <p className="text-gray-700">
              Brolympics is a competition where many teams of two meet in a myrad of games to prove they're the best. From go-karting to beer die to trivia, you'll compete in to gain as many points as possible throughout the weekend.
            </p>
          </section>

        {/* Description */}
        <section className="px-4 py-4">
            <h2 className="mb-2 text-2xl font-semibold">Rules</h2>
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold">Team Formation</h3>
                    <p>• Teams always consist of 2 players.</p>
                    <p>• You choose your own partner for the competition.</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Event Types</h3>
                    <p>1. Head-to-Head Events:</p>
                    <ul className="ml-4 list-disc list-inside">
                        <p>• Teams compete directly against each other.</p>
                        <p>• After round-robin, top 4 teams enter a bracket tournament.</p>
                    </ul>
                    <p>2. Score-Based Events:</p>
                    <ul className="ml-4 list-disc list-inside">
                        <p>• Teams compete against everyone's scores (e.g., trivia, bowling).</p>
                        <p>• Final rankings are determined by total scores or best individual scores.</p>
                    </ul>
                </div>
                <div>
                    <h3 className="mb-2 text-lg font-semibold">Scoring</h3>
                    <p className="mb-2">Scoring in the top 3 will earn bonus points.</p>
                    <table className="w-full border border-collapse border-gray-300">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 border border-gray-300">Place</th>
                            <th className="px-4 py-2 border border-gray-300">Points</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="px-4 py-2 border border-gray-300">1st</td>
                            <td className="px-4 py-2 border border-gray-300">3 + 2nd place points</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 border border-gray-300">2nd</td>
                            <td className="px-4 py-2 border border-gray-300">2 + 3rd place points</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 border border-gray-300">3rd</td>
                            <td className="px-4 py-2 border border-gray-300">2 + 4th place points</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 border border-gray-300">4th and below</td>
                            <td className="px-4 py-2 border border-gray-300">1 + previous place's points</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 border border-gray-300">Last Place</td>
                            <td className="px-4 py-2 border border-gray-300"> 1 </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

          </section>
    
          {/* Recent Competitions */}
          <section className="px-4 py-8 bg-white">
            <h2 className="mb-4 text-2xl font-semibold">Browse Former Brolympics</h2>
            <div className="space-y-4">
              {brols.map((comp) => (
                <Link 
                  key={comp.id} 
                  to={`/competition/${comp.id}`} 
                  className="block p-4 transition duration-300 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  <h3 className="text-lg font-semibold">{comp.name}</h3>
                  <p className="text-gray-600">{comp.date}</p>
                </Link>
              ))}
            </div>
          </section>
    
          {/* Call to Action */}
          <section className="px-4 py-8 text-center text-white bg-blue-500">
            <h2 className="mb-6 text-2xl font-semibold">Ready to join the action?</h2>
            <Link 
              to="/create-account" 
              className="px-6 py-2 font-semibold text-blue-500 transition duration-300 bg-white rounded-md hover:bg-blue-100"
            >
              Sign Up Now!
            </Link>
          </section>
        </div>
      );
    };
    

export default Home