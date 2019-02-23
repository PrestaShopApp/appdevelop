import { get_request } from '../api/PrestashopAPI';
import { stripAndTruncate } from '../utils/methods';
import {
  getCategoriesData,
  getCategoryData,
  getProductsData,
} from '../utils/ApiData';
import {
  GET_REQUEST_PRODUCTS,
  GET_RECEIVED_PRODUCTS_SUCCESS,
  GET_RECEIVED_PRODUCTS_FAILURE,
  GET_REQUEST_CATEGORIES,
  GET_RECEIVED_CATEGORIES_FAILURE,
  GET_RECEIVED_CATEGORIES_SUCCESS,
} from './types';

// ----  API PRODUCTS ----
// All products
export const requestProducts = () => ({
  type: GET_REQUEST_PRODUCTS,
});

export const receivedProductsSuccess = data => ({
  type: GET_RECEIVED_PRODUCTS_SUCCESS,
  products: data,
});

export const receivedProductsFailure = error => ({
  type: GET_RECEIVED_PRODUCTS_FAILURE,
  error: error,
});

// ----  API CATEGORIES ----
export const requestCategories = () => ({
  type: GET_REQUEST_CATEGORIES,
});

export const receivedCategoriesSuccess = (
  root,
  principalCategory,
  childCategories
) => ({
  type: GET_RECEIVED_CATEGORIES_SUCCESS,
  root: root,
  principalCategory: principalCategory,
  childCategories: childCategories,
});

export const receivedCategoriesFailure = error => ({
  type: GET_RECEIVED_CATEGORIES_FAILURE,
  error: error,
});

// ---- FUNCTIONS -----

export function getProducts(idCategory) {
  //if idCategory, get ProductsByCategory
  filter = idCategory
    ? (filter = { attribute: 'id_category_default', value: `[${idCategory}]` })
    : null;
  return function(dispatch) {
    dispatch(requestProducts());
    return get_request('products', 'full', null, filter)
      .then(response => {
        let result = getProductsData(response.products);
        dispatch(receivedProductsSuccess(result));
      })
      .catch(error => {
        dispatch(receivedProductsFailure(error));
        throw error;
      });
  };
}

export function getProduct(id) {
  let url = `products/${id}`;
  return function(dispatch) {
    dispatch(requestProducts());
    return get_request(url)
      .then(data => {
        dispatch(receivedProductsSuccess(data));
      })
      .catch(error => {
        dispatch(receivedProductsFailure(error));
        throw error;
      });
  };
}

// https://prestashopappmobile.es/api/categories?filter[id]=[2,3]&display=full

export function getCategories(root, id) {
  //Fetch first time or fetch specfic category
  let url = 'categories';
  let display = null;
  let filter = null;
  //If root take level depth 2 from category tree
  if (root) {
    filter = { attribute: 'level_depth', value: '2' };
    display = 'full';
  } else {
    url = url + `/${id}`;
  }

  return function(dispatch) {
    dispatch(requestCategories());
    return get_request(url, display, null, filter)
      .then(response => {
        //Use manual method to get Data
        result = resolveDataAfterRequestCategory(
          root,
          response
        ).then(result => {
          dispatch(receivedCategoriesSuccess(result[0], result[1], result[2]));
        });
      })
      .catch(error => {
        dispatch(receivedCategoriesFailure(error));
        throw error;
      });
  };
}

// Function that return the data result depends if is root or specific category
// return [root, principalCategory, childCategories]
async function resolveDataAfterRequestCategory(root, response) {
  if (root) {
    let childCategories = getCategoriesData(response.categories);

    return [root, null, childCategories];
  } else {
    let data = response.category;
    let principalCategory = getCategoryData(data);
    //If the categorie does not have child categories, return
    if (!data.associations.categories) return [root, principalCategory, null];
    //Get filter to fetch child categories
    filter = { attribute: 'id_parent', value: `[${data.id}]` };
    //Fetch child categories, we use recursion to get data
    let secondResponse = await get_request('categories', 'full', null, filter);
    let childCategories = await resolveDataAfterRequestCategory(
      true,
      secondResponse
    );
    return [root, principalCategory, childCategories[2]];
  }
}
