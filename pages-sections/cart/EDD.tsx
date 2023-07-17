"use client";

import { H6 } from "@/components/Typography";
import { FlexBetween } from "@/components/flex-box";
import { getDatesBetween } from "@/helpers/Extensions";
import useProductService from "@/hooks/useProductService";
import { IProductResponse } from "@/interface/IProductResponse";
import { SearchQuery } from "@/types/TSearchQuery";
import { Box } from "@mui/material";
import { MdOutlineWatchLater } from "react-icons/md";
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
    <Box sx={{ width: "100%" }}>
      {_response?.closeDay != "" ? (
        <Box
          py={1}
          sx={{
            borderRadius: "4px",
            background: "white",
          }}
        >
          <FlexBetween alignItems={"center"} justifyContent={"flex-start"}>
            <p className="text-xs md:text-sm px-3">
              Receive you order <strong>{_response?.closeDay} </strong> if you
              order within <strong>{_response?.hours} hours </strong>
            </p>
          </FlexBetween>
        </Box>
      ) : (
        <Box
          py={1}
          sx={{
            borderRadius: "4px",
            background: "white",
          }}
        >
          <FlexBetween alignItems={"flex-start"} justifyContent={"flex-start"}>
            <p className="text-xs md:text-sm px-3">
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
          </FlexBetween>
        </Box>
      )}
    </Box>
  );
};

export default EDD;
