import PrestashopAPI from '../api/PrestashopAPI';
import { stripAndTruncate } from '../utils/methods';
import {
  GET_REQUEST_PRODUCTS,
  GET_RECEIVED_PRODUCTS_SUCCESS,
  GET_RECEIVED_PRODUCTS_FAILURE,
  GET_REQUEST_CATEGORIES,
  GET_RECEIVED_CATEGORIES_FAILURE,
  GET_RECEIVED_CATEGORIES_SUCCESS,
} from './types';

// ----  API PRODUCTS ----
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
  type: GET_REQUEST_PRODUCTS,
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

export function getProducts() {
  return function(dispatch) {
    dispatch(requestProducts());
    return PrestashopAPI.get_request('products', 'full')
      .then(response => {
        let result = [];
        let data = response.products;
        for (var i = 0; i < data.length; i++) {
          result.push({
            id: data[i].id,
            name: data[i].name[0].value,
            price: data[i].price,
            image: data[i].associations.images[0].id,
          });
        }
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
    return PrestashopAPI.get_request(url)
      .then(data => {
        dispatch(receivedProductsSuccess(data));
      })
      .catch(error => {
        dispatch(receivedProductsFailure(error));
        throw error;
      });
  };
}

export function getCategories(root, id) {
  //Fetch first time or fetch specfic category
  console.log('ROOOT', root);
  let url = 'categories';
  let display = null;
  let filter = null;

  if (root) {
    filter = {
      attribute: 'level_depth',
      value: '2',
    };
    display = 'full';
  } else {
    url = url + `/${id}`;
  }

  return function(dispatch) {
    dispatch(requestCategories());
    return PrestashopAPI.get_request(url, display, null, filter)
      .then(response => {
        let result = [];
        let data = response.categories;
        for (var i = 0; i < data.length; i++) {
          result.push({
            id: data[i].id,
            name: data[i].name[0].value,
            description: stripAndTruncate(data[i].description[0].value),
            active: data[i].active,
            // image: data[i].associations.images[0].id,
          });
        }
        dispatch(receivedCategoriesSuccess(root, null, result));
      })
      .catch(error => {
        dispatch(receivedCategoriesFailure(error));
        throw error;
      });
  };
}
