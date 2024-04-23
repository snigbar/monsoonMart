import { TLocationApiResponse } from "@/pages/BecomeSeller/BecomeSeller.interface";
import { baseApi } from "@/store/api/baseApi";

const becomeSellerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // location data fetch
    fetchBDLocations: builder.query<TLocationApiResponse, string>({
      query: (url) => ({
        url: url,
      }),
    }),
    // get seller
    getSellerWithUserId: builder.query({
      query: () => ({
        url: "/seller/get-seller",
        credentials: "include",
      }),
    }),
  }),
});

export const { useFetchBDLocationsQuery, useGetSellerWithUserIdQuery } =
  becomeSellerApi;
