import axios, { AxiosError } from 'axios';
import { DiaryEntry, NewDiary } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data)
}

export const createDiary = (object: NewDiary) => {
    return axios
      .post<DiaryEntry>(baseUrl, object)
      .then(response => response.data)
      .catch((error: AxiosError) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error(error.response.data);
          // Propagate the error by rejecting the promise with the server response
          return Promise.reject(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error(error.request);
          // Propagate the error by rejecting the promise with the error request
          return Promise.reject(error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error(error.message);
          // Propagate the error by rejecting the promise with the error message
          return Promise.reject(error.message);
        }
      });
  }