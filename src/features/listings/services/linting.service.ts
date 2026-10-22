import { Pagination, ResponseList } from "../../common/ResponseList";
import { apiRequest } from "../../common/services/http";
import { Listing } from "../domain/Listing";


export const getAllListings = async (pagination?: Pagination) => {
    const query = new URLSearchParams({
        limit: String(pagination?.limit ?? 10),
        page: String(pagination?.page ?? 1),
    })
      return apiRequest<ResponseList<Listing>>(`/listings?${query}`, {
            errorMessage: "No se pudieron cargar las categorías.",
        });

    
}

