import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UserInfo from "./Components/UserInfo/UserInfo";
import {
  fetchAge,
  fetchGender,
  fetchNationality,
} from "./features/nameSlice.js";
import { useDispatch } from "react-redux";
function App() {
  const [name, setName] = useState("");
  const [showResult, setShowResult] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setShowResult(false);
  }, [name]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.match(/[0-9]/) !== null) {
      setError("Name should not contain numbers.");
      setResults(null);
      toast.error(error);
      return;
    }
    if (name.length < 3) {
      toast.error("Name must be greater than 3 characters");
      return;
    }
    if (name.length > 20) {
      toast.error("Name must be less than 20 characters");
      return;
    }
    if (name) {
      setShowResult(true);
      dispatch(fetchAge(name));
      dispatch(fetchGender(name));
      dispatch(fetchNationality(name));
    }
  };
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

        {showResult && (
          <div className="bg-white text-black py-10 flex justify-center items-center h-[200px]">
            <UserInfo name={name} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
