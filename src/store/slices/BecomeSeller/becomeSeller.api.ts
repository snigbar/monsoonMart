import { TLocationApiResponse } from "@/pages/BecomeSeller/BecomeSeller.interface";
import { baseApi } from "@/store/api/baseApi";

const becomeSellerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchBDLocations: builder.query<TLocationApiResponse, string>({
      query: (url) => ({
        url: url,
      }),
    }),
  }),
});

export const { useFetchBDLocationsQuery } = becomeSellerApi;
