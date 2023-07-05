import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  IconButton,
  Slider,
  styled,
  TextField,
  Tooltip,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { TProductCategory } from "@/types/TProductCategory";
import { TProductTags } from "@/types/TProductTags";
import useProductService from "@/hooks/useProductService";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { H6, Span } from "@/components/Typography";
import { FlexBetween, FlexBox } from "@/components/flex-box";
import { variants } from "@/utils/constants";
import {
  createUrlWithSearch,
  eColor,
  getSubCategories,
} from "@/helpers/Extensions";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useQuery } from "react-query";
import { Disclosure, RadioGroup } from "@headlessui/react";
import { MdOutlineRemove } from "react-icons/md";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import SubCategorySection from "./SubCategorySection";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const PrettoSlider = styled(Slider)({
  color: "#D3C4AB",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#D3C4AB",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const FilterSection: FC = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { onGetCategories, onGetTags } = useProductService();
  const [value, setValue] = useState<number[]>([
    (searchParams?.get("min") as unknown as number) ?? 0,
    (searchParams?.get("max") as unknown as number) ?? 250,
  ]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const onMouseUpSlides = () => {
    handleFilterChange(
      ["min", "max"],
      [value[0] as unknown as string, value[1] as unknown as string]
    );
  };

  const { data: categories } = useQuery(
    "Categories",
    () => onGetCategories() as Promise<TProductCategory[]>,
    {
      enabled: true,
      cacheTime: 60000,
    }
  );
  const { data: productTags } = useQuery(
    "Tags",
    () => onGetTags() as Promise<TProductTags[]>,
    {
      enabled: true,
      cacheTime: 60000,
    }
  );

  const handleFilterChange = (
    key: string | string[],
    value: string | string[] | null
  ) => {
    const newUri = createUrlWithSearch(key, value, searchParams, pathname);
    router.push(newUri);
  };

  useEffect(() => {
    setValue([
      (searchParams?.get("min") as unknown as number) ?? 0,
      (searchParams?.get("max") as unknown as number) ?? 250,
    ]);
  }, [searchParams]);

  const ClearFilter = (queryCleared: string) => {
    switch (queryCleared) {
      case "price":
        handleFilterChange(["min", "max"], null);
        break;
      case "color":
        handleFilterChange("color", null);
        break;
      default:
        return;
    }
  };

  const handleColor = (color: eColor) => {
    handleFilterChange("color", color.toString());
  };

  console.log(params);
  return (
    <Card sx={{ p: "18px 27px", overflow: "auto" }} elevation={5}>
      <H6 mb={1.25}>Categories</H6>

      {categories?.map((item, index) => (
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between bg-transparent border-b border-gray-400  py-2 text-left text-sm font-medium text-white focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span
                  className={`${
                    item.description == params?.category
                      ? "text-black font-semibold "
                      : "text-gray-600 font-normal"
                  } `}
                >
                  {item.name}
                </span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-black`}
                />
              </Disclosure.Button>
              <Collapse in={open}>
                <Disclosure.Panel
                  // as={Link}
                  // href={`/shop/${item.description}/${i.description}`}
                  static
                  className="pt-1 text-sm text-gray-500"
                  style={{ whiteSpace: "break-spaces" }}
                >
                  <SubCategorySection
                    subCategory={item.productSubCategory}
                    category={item.description.toLowerCase()}
                  />
                </Disclosure.Panel>
              </Collapse>
            </>
          )}
        </Disclosure>
      ))}

      {/* <div className="grid gap-4">
        {categories?.map((item, index) => (
          <Link
            href={`/shop/${item?.description.toLowerCase()}`}
            key={item.description}
            style={{ textDecoration: "underline" }}
            className={`${
              (params?.category as string)?.toLowerCase() ==
              item?.description.toLowerCase()
                ? "text-gray-800"
                : "text-gray-400"
            }`}
          >
            <Span>{item.name}</Span>
          </Link>
        ))}
      </div> */}

      <Divider sx={{ my: 2, borderColor: "white" }} />
      {/* PRICE VARIANT FILTER */}
      <FlexBetween alignItems={"flex-start"}>
        <H6 mb={2}>Price Range</H6>
        {(searchParams?.get("min") || searchParams?.get("max")) && (
          <Tooltip title="clear">
            <IconButton
              onClick={() => ClearFilter("price")}
              size="small"
              sx={{
                background: "white",
                width: "22px",
                height: "22px",
                border: "2px solid white",
                ":hover": {
                  background: "#D3C4AB",
                  border: "2px solid white",
                  color: "white",
                },
              }}
            >
              <ClearIcon
                sx={{
                  width: "16px",
                  height: "16px",
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </FlexBetween>
      <FlexBetween>
        <PrettoSlider
          onMouseUp={onMouseUpSlides}
          onTouchEnd={onMouseUpSlides}
          min={50}
          max={250}
          getAriaLabel={() => "Price range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
      </FlexBetween>

      <Divider sx={{ my: 2, borderColor: "white" }} />

      <FlexBetween alignItems={"flex-start"}>
        <H6 mb={2}>Colors</H6>
        {searchParams?.get("color") && (
          <Tooltip title="clear">
            <IconButton
              onClick={() => ClearFilter("color")}
              size="small"
              sx={{
                background: "white",
                width: "22px",
                height: "22px",
                border: "2px solid white",
                ":hover": {
                  background: "#D3C4AB",
                  border: "2px solid white",
                  color: "white",
                },
              }}
            >
              <ClearIcon
                sx={{
                  width: "16px",
                  height: "16px",
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </FlexBetween>
      <FlexBox mb={2} flexWrap="wrap" gap={1}>
        {colorList.map((item, index) => (
          <Box
            key={index}
            sx={{
              background: `${
                (searchParams?.get("color") as unknown as number) == item.value
                  ? "wheat"
                  : ""
              }`,
              width: 32,
              height: 32,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              display: "flex",
              border: "1px solid gray",
            }}
          >
            <button
              style={{
                width: 26,
                height: 26,
                background: item.color.toLowerCase(),
                cursor: "pointer",
                borderRadius: "50%",
                border: 0,
              }}
              onClick={() => handleColor(item.value)}
            ></button>
          </Box>
        ))}
      </FlexBox>

      <Divider sx={{ my: 2, borderColor: "white" }} />

      {/* {otherOptions.map((item, index) => (
        <FormControlLabel
          key={item}
          sx={{ display: "flex" }}
          label={<Span color="inherit">{item}</Span>}
          control={
            <Checkbox
              defaultChecked={searchParams?.get(`others${index}`) !== null}
              size="small"
              color="secondary"
              onChange={(e) =>
                handleQuery(
                  e.target.checked,
                  item.replace(/ /g, "").toLowerCase(),
                  `others${index}`
                )
              }
            />
          }
        />
      ))} */}

      <H6 mb={2}>Sizes</H6>
      <RadioGroup
        onChange={(e: any) =>
          handleFilterChange("size", e.value?.toLowerCase())
        }
        className="mt-4"
      >
        <div className={`grid grid-cols-2 gap-4`}>
          {variants?.map((size, index) => (
            <RadioGroup.Option
              key={size.label}
              value={size}
              className={({ active }) =>
                classNames(
                  "cursor-pointer bg-white text-gray-900 shadow-sm",
                  searchParams?.get("size") == size.value?.toLowerCase()
                    ? "ring-2 ring-indigo-500"
                    : "",
                  "group relative flex items-center justify-center rounded-md border py-2 px-2 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <RadioGroup.Label as="span">{size.label}</RadioGroup.Label>
                  <span
                    className={classNames(
                      active ? "border" : "border-2",
                      "border-transparent",
                      "pointer-events-none absolute -inset-px rounded-md"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
          <RadioGroup.Option
            key={"remove-size"}
            value={""}
            className={({ active }) =>
              classNames(
                "cursor-pointer bg-white text-gray-900 shadow-sm",
                "group relative flex items-center justify-center rounded-md border py-2 px-2 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
              )
            }
          >
            <RadioGroup.Label as="span">
              <MdOutlineRemove />
            </RadioGroup.Label>
          </RadioGroup.Option>
        </div>
      </RadioGroup>

      <Divider sx={{ mt: 2, mb: 3, borderColor: "white" }} />

      <H6 mb={1.25}>Tags</H6>

      <RadioGroup
        onChange={(e: any) => handleFilterChange("tag", e.name?.toLowerCase())}
        className="mt-4"
      >
        <div className={`grid grid-cols-2 gap-4`}>
          {productTags?.map((tag, index) => (
            <RadioGroup.Option
              key={tag.name}
              value={tag}
              className={({ active }) =>
                classNames(
                  "cursor-pointer bg-white text-gray-900 shadow-sm",
                  searchParams?.get(`tag`) == tag.name?.toLowerCase()
                    ? "ring-2 ring-indigo-500"
                    : "",
                  "group relative flex items-center justify-center rounded-md border py-2 px-2 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <RadioGroup.Label as="span">{tag.name}</RadioGroup.Label>
                  <span
                    className={classNames(
                      active ? "border" : "border-2",
                      "border-transparent",
                      "pointer-events-none absolute -inset-px rounded-md"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
          <RadioGroup.Option
            key={"remove-tag"}
            value={""}
            className={({ active }) =>
              classNames(
                "cursor-pointer bg-white text-gray-900 shadow-sm",
                "group relative flex items-center justify-center rounded-md border py-2 px-2 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
              )
            }
          >
            <RadioGroup.Label as="span">
              <MdOutlineRemove />
            </RadioGroup.Label>
          </RadioGroup.Option>
        </div>
      </RadioGroup>
    </Card>
  );
};

const otherOptions = ["On Sale"];
const colorList = [
  {
    color: "black",
    value: eColor.Black,
  },
  {
    color: "white",
    value: eColor.White,
  },
  {
    color: "gray",
    value: eColor.Gray,
  },
];

export default FilterSection;
