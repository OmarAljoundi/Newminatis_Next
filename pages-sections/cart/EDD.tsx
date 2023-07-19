"use client";
import { getDatesBetween } from "@/helpers/Extensions";
import useProductService from "@/hooks/useProductService";
import { IProductResponse } from "@/interface/IProductResponse";
import { SearchQuery } from "@/types/TSearchQuery";
import { useQuery } from "react-query";
const EDD = () => {
  const { onSearchOne } = useProductService();

  const fetchProduct = async () => {
    const SearchQuery: SearchQuery = {
      FilterByOptions: [],
      OrderByOptions: [],
      PageIndex: 0,
      PageSize: 1,
    };
    return (await onSearchOne(SearchQuery)) as IProductResponse;
  };

  const { data: _response } = useQuery("Fetch EDD", () => fetchProduct(), {
    refetchOnWindowFocus: true,
    enabled: true,
  });
  return (
    <div className="w-full my-2 lg:my-0">
      {_response?.closeDay != "" ? (
        <div
          className="bg-orange-100 border-t-4 border-orange-500 text-orange-700  px-3 py-3 "
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-orange-700 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="text-xs md:text-sm px-3">
                Receive you order <strong>{_response?.closeDay} </strong> if you
                order within <strong>{_response?.hours} hours </strong>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="bg-orange-100 border-t-4 border-orange-500 text-orange-700  px-3 py-3 "
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-orange-700 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="text-xs md:text-sm ">
                Receive you order{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: getDatesBetween(
                      _response?.minEdd,
                      _response?.maxEdd,
                      _response?.currentDate
                    ),
                  }}
                ></span>{" "}
                if you order within <strong>{_response?.hours} hours </strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EDD;

// <Box
//   py={1}
//   sx={{
//     borderRadius: "4px",
//     background: "white",
//   }}
// >
//   <FlexBetween alignItems={"flex-start"} justifyContent={"flex-start"}>
//     <p className="text-xs md:text-sm px-3">
//       Receive you order{" "}
//       <span
//         dangerouslySetInnerHTML={{
//           __html: getDatesBetween(
//             _response?.minEdd,
//             _response?.maxEdd,
//             _response?.currentDate
//           ),
//         }}
//       ></span>{" "}
//       if you order within <strong>{_response?.hours} hours </strong>
//     </p>
//   </FlexBetween>
// </Box>;
