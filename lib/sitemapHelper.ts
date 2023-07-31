import ProductService from "@/service/ProductService";
import { SearchQuery, eFilterOperator } from "@/types/TSearchQuery";
import { getCategories } from "./serverActions";

export const getAllPaths = async () => {
  const categories = await getCategories();
  const [x1, x2, x3] = await Promise.all([
    getAllProductPages(),
    getAllCategoriesPages(categories),
    getAllSubCategoriesPages(categories),
  ]);
  return [
    {
      loc: `${process.env.SITE_URL}`,
      lastmod: new Date(),
      changefreq: "daily",
      priority: 1.0,
    },
    ...x1,
    ...x2,
    ...x3,
  ];
};

const getAllProductPages = async () => {
  const SearchQuery: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 0,
  };
  SearchQuery.FilterByOptions.push({
    FilterFor: 1,
    MemberName: "Status",
    FilterOperator: eFilterOperator.Equal,
  });

  const response = await ProductService.searchShop(SearchQuery);

  return response.data.products.map((product) => ({
    loc: `${
      process.env.SITE_URL
    }/product/${product.name.toLowerCase()}-0${product.color.toString()}`,
    lastmod: product.ModifiedDate || new Date(),
    changefreq: "daily",
    priority: 0.8,
  }));
};

const getAllCategoriesPages = (categories): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    resolve(
      categories.map((category) => ({
        loc: `${
          process.env.SITE_URL
        }/shop/${category.description.toLowerCase()}`,
        lastmod: category.modifiedDate || new Date(),
        changefreq: "daily",
        priority: 0.8,
      }))
    );
  });
};

const getAllSubCategoriesPages = (categories): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    var subs: any[] = [];
    categories.map((c) => {
      c.productSubCategory.map((s) => {
        subs.push({
          loc: `${
            process.env.SITE_URL
          }/shop/${c.description.toLowerCase()}/${s.description.toLowerCase()}`,
          lastmod: c.modifiedDate || new Date(),
          changefreq: "daily",
          priority: 0.8,
        });
      });
    });
    return resolve(subs);
  });
};
