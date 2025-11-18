import axios from "axios";

export const api = axios.create({
      baseURL: "https://affiliate.api.handicapp.co.ao/api"
})

export const external_api = axios.create(
      {
            baseURL: "https://api.soccersapi.com"
      }
)

export const external_api_handcapp = axios.create(
      {
            baseURL: "https://app.batota.ao/api"
      }
)