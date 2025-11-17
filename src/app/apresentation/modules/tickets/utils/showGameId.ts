import { external_api } from "@/app/ infrastructure/api/api";
import { Env } from "@/app/env/env";

export async function showGameId(id: string) {
    try {
        const response = await external_api.get(`/v2.2//fixtures/?user=${Env.USERNAME}&token=${Env.TOKEN}&t=info&id=${id}`)
      return response.data.data
    } catch (error) {
        console.log(error)
    }
}