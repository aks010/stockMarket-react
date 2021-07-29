import axios from "axios";

export default axios.create({
  baseURL: `https://stockmarketcompany.herokuapp.com/`,
  // baseURL: `http://localhost:8081/`,
});
