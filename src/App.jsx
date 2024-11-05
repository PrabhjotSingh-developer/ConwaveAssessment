import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./Components/Loader/Loader";
import UserInfo from "./Components/UserInfo/UserInfo";
function App() {
  const [name, setName] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    if (name.match(/[0-9]/) !== null) {
      setError("Name should not contain numbers.");
      setResults(null);
      toast.error(error);
      return;
    }
    if (name.length < 3) {
      toast.error("Name must be greater than 3 digits");
      return;
    }
    try {
      setLoading(true);

      const [ageRes, genderRes, nationalityRes] = await Promise.all([
        axios.get(`https://api.agify.io?name=${name}`),
        axios.get(`https://api.genderize.io?name=${name}`),
        axios.get(`https://api.nationalize.io?name=${name}`),
      ]);
      setResults({
        age: ageRes.data.age,
        gender: genderRes.data.gender,
        nationality: nationalityRes.data.country,
      });
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setResults(null);
    setError(null);
  }, [name]);
  return (
    <div className="bg-gray-800">
      <div className="w-[100%] px-4 md:w-[60%] mx-auto flex flex-col gap-4 pt-10  text-white h-[100vh]">
        <h1 className="text-2xl text-center">
          Guess Age, Gender, and Nationality
        </h1>
        <form
          onSubmit={handleSubmit}
          className="py-10 flex justify-center flex-col gap-5"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
            className="text-black w-[100%] md:w-[75%] lg:w-[50%] mx-auto outline-none px-2 py-2"
            required
          />
          <button
            type="submit"
            className="bg-green-700 w-fit mx-auto py-1 px-8 rounded-md"
          >
            Guess
          </button>
        </form>
        {error && <p className="error text-center">{error}</p>}
        <div>
          {loading ? (
            <div className="bg-white text-black h-[200px] flex justify-center w-[100%] items-center">
              <Loader />
            </div>
          ) : (
            results && (
              <div className="bg-white text-black h-[200px] flex justify-center w-[100%] items-center flex-col gap-4">
                <h2 className="text-2xl font-semi">Guess Results</h2>

                <UserInfo
                  name={name}
                  age={results?.age}
                  nationality={results?.nationality}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
