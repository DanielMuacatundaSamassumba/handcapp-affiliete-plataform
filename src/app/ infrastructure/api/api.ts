import axios from "axios";

export const api =  axios.create({
      baseURL:"https://affiliate.handicapp.co.ao/api"
})