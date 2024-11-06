import React from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { defaultCountry, defaultGender } from "../../Constants/constant.js";
const UserInfo = ({ name }) => {
  const { gender, nationality, age, loading, error } = useSelector(
    (state) => state.name
  );

  if (error) {
    return (
      <div>
        <p className="font-semibold text-2xl">Cannot find data</p>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h2 className="text-2xl font-semibold my-2">Guess Results</h2>
          <ul>
            <li>Name : {name}</li>
            <li>Gender : {gender != null ? gender : defaultGender}</li>
            <li>
              Age : {age != null ? age : Math.floor(Math.random() * 80) + 1}
            </li>
            <li>
              Nationality : {nationality != null ? nationality : defaultCountry}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
