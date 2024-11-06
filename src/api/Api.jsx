// src/api/nameAPI.js
import axios from "axios";

export const fetchAgeData = (name) =>
  axios.get(`https://api.agify.io?name=${name}`);
export const fetchGenderData = (name) =>
  axios.get(`https://api.genderize.io?name=${name}`);
export const fetchNationalityData = (name) =>
  axios.get(`https://api.nationalize.io?name=${name}`);
