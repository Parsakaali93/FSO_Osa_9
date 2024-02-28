import axios from "axios";
import { Patient, PatientFormValues, Entry, NewEntry } from "../types";
import { AxiosError } from "axios";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getOne = async (id:string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export const createEntry = async (id:string, object: NewEntry) => {
  try{
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      object
    );

    return data;
  }

  catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError; // Cast error to AxiosError
      throw axiosError.response?.data; // Throw the error response data if available
    } else {
      // Handle other types of errors here
      throw error; // Or throw the error as it is
    }
  }
};

export default {
  getAll, create, getOne
};

