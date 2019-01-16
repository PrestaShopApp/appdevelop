import { get_request } from '../api/PrestashopAPI';
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

export function getProducts() {
  return function(dispatch) {
    dispatch(requestProducts());
    return get_request('products', 'full')
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
  console.log('ROOOT', root);
  let url = 'categories';
  let display = null;
  let filter = null;
  //If root take level depth 2 from category tree
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
    return get_request(url, display, null, filter)
      .then(response => {
        //Use manual method to get Data
        result = resolveDataAfterRequestCategory(
          root,
          response
        ).then(result => {
          console.log('DEVOLVER TODO', result);
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
    let data = response.categories;
    let childCategories = [];
    for (var i = 0; i < data.length; i++) {
      childCategories.push({
        id: data[i].id,
        name: data[i].name[0].value,
        description: stripAndTruncate(data[i].description[0].value),
        active: data[i].active,
        // image: data[i].associations.images[0].id,
      });
    }
    return [root, null, childCategories];
  } else {
    let data = response.category;
    //Get data from principal category
    principalCategory = {
      id: data.id,
      idParent: data.id_parent,
      level_depth: data.level_depth,
      name: data.name[0].value,
      description: stripAndTruncate(data.description[0].value, 100),
    };
    //Get child categories from principal category if empty stop
    idArrayFetchFromAPI = data.associations.categories;
    if (!idArrayFetchFromAPI) return [root, principalCategory, null];
    idCategoriesArray = [];
    for (var i = 0; i < idArrayFetchFromAPI.length; i++) {
      idCategoriesArray.push(idArrayFetchFromAPI[i].id);
    }
    //Get filter to fetch child categories
    filter = {
      attribute: 'id',
      value: `[${idCategoriesArray.join(',')}]`,
    };
    //Fetch child categories, we use recursion to get data
    let secondResponse = await get_request('categories', 'full', null, filter);
    let childCategories = await resolveDataAfterRequestCategory(
      true,
      secondResponse
    );

    return [root, principalCategory, childCategories[2]];
  }
}
