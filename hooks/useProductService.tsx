import ProductService from "@/service/ProductService";
import { TProduct } from "@/types/TProduct";
import { TProductCategory } from "@/types/TProductCategory";
import { SearchQuery } from "@/types/TSearchQuery";
import { TStockRequest } from "@/types/TStockRequest";
import { useState } from "react";

const useProductService = () => {
  const [CreateLoad, setCreateLoad] = useState(false);

  const onCreateProduct = (body: TProduct) => {
    setCreateLoad(true);

    return new Promise((resolve, reject) => {
      ProductService.create(body)
        .then((res) => {
          setCreateLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setCreateLoad(false);
          reject(err);
        });
    });
  };

  const onGetCategories = () => {
    setCreateLoad(true);
    return new Promise((resolve, reject) => {
      ProductService.getCategories()
        .then((res) => {
          setCreateLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setCreateLoad(false);
          reject(err);
        });
    });
  };

  const onGetTags = () => {
    setCreateLoad(true);
    return new Promise((resolve, reject) => {
      ProductService.getTags()
        .then((res) => {
          setCreateLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setCreateLoad(false);
          reject(err);
        });
    });
  };

  const onGetVariants = () => {
    setCreateLoad(true);
    return new Promise((resolve, reject) => {
      ProductService.getVariants()
        .then((res) => {
          setCreateLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setCreateLoad(false);
          reject(err);
        });
    });
  };

  const onUploadImages = (data: FormData) => {
    setCreateLoad(true);
    return new Promise((resolve, reject) => {
      ProductService.uploadImages(data)
        .then((res) => {
          setCreateLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setCreateLoad(false);
          reject(err);
        });
    });
  };

  const onPostCategory = (data: TProductCategory) => {
    setCreateLoad(true);
    return new Promise((resolve, reject) => {
      ProductService.postCategory(data)
        .then((res) => {
          setCreateLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setCreateLoad(false);
          reject(err);
        });
    });
  };

  const onDeleteCategroy = (id: number) => {
    setCreateLoad(true);
    return new Promise((resolve, reject) => {
      ProductService.removeCategories(id)
        .then((res) => {
          setCreateLoad(false);
          resolve(res.status);
        })
        .catch((err) => {
          setCreateLoad(false);
          reject(err);
        });
    });
  };

  const onSearchShop = (Search: SearchQuery) => {
    setCreateLoad(true);
    return new Promise((resolve, reject) => {
      ProductService.searchShop(Search)
        .then((res) => {
          setCreateLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setCreateLoad(false);
          reject(err);
        });
    });
  };

  const onSearchOne = (Search: SearchQuery) => {
    setCreateLoad(true);
    return new Promise((resolve, reject) => {
      ProductService.searchOne(Search)
        .then((res) => {
          setCreateLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setCreateLoad(false);
          reject(err);
        });
    });
  };

  const onGetQuantity = (stock: TStockRequest) => {
    setCreateLoad(true);
    return new Promise((resolve, reject) => {
      ProductService.getQuantity(stock)
        .then((res) => {
          setCreateLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setCreateLoad(false);
          reject(err);
        });
    });
  };

  const onGetProductById = (id: number) => {
    setCreateLoad(true);
    return new Promise((resolve, reject) => {
      ProductService.getById(id)
        .then((res) => {
          setCreateLoad(false);
          resolve(res.data);
        })
        .catch((err) => {
          setCreateLoad(false);
          reject(err);
        });
    });
  };

  return {
    onCreateProduct,
    onGetCategories,
    onGetVariants,
    onUploadImages,
    onPostCategory,
    onDeleteCategroy,
    onSearchShop,
    onGetQuantity,
    onSearchOne,
    onGetProductById,
    onGetTags,
    CreateLoad,
  };
};

export default useProductService;
