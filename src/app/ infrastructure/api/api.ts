import axios from "axios";

export const api = axios.create({
      baseURL: "http://127.0.0.1:8001/api"
})

export const external_api = axios.create(
      {
            baseURL: "https://api.soccersapi.com"
      }
)

export const external_api_handcapp = axios.create(
      {
            baseURL: "http://127.0.0.1:8000/api"
      }
)