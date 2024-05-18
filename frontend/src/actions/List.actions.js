import axios from "axios";

const baseApiResponse = (data, isSuccess) => {
  return {
    success: isSuccess,
    data: data || null,
  };
};


// fetch list data from database
export const fetchList = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/watchlist`
    );

    console.log("Response from Backend");
    console.log(response.data);
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error(error);
    return baseApiResponse(null, false);
  }
};


export const addData = async (input) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/add`, input
    );

    console.log("Response from Backend");
    console.log(response.data);
    return baseApiResponse(response.data.results, true);
  } catch (error) {
    console.error(error);
    return baseApiResponse(null, false);
  }
};

export const removeData = async (key) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/remove/${key}`
    );

    console.log("Response from Backend");
    console.log("Data removed");
    return baseApiResponse(response.data, true);
  } catch (error) {
    console.error(error);
    return baseApiResponse(null, false);
  }
};