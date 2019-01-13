import {
  GET_REQUEST_PRODUCTS,
  GET_RECEIVED_PRODUCTS_SUCCESS,
  GET_RECEIVED_PRODUCTS_FAILURE,
  GET_REQUEST_CATEGORIES,
  GET_RECEIVED_CATEGORIES_SUCCESS,
  GET_RECEIVED_CATEGORIES_FAILURE,
} from '../actions/types';

const initial_state = {
  products: null,
  categories: { root: null, principalCategory: null, childCategories: null },
  loading: false,
};

const Api = (state = initial_state, action) => {
  switch (action.type) {
    case GET_REQUEST_PRODUCTS:
      return { ...state, loading: true };
    case GET_RECEIVED_PRODUCTS_SUCCESS:
      return { ...state, products: action.products, loading: false };
    case GET_RECEIVED_PRODUCTS_FAILURE:
      return { ...state, error: action.error, loading: false };
    case GET_REQUEST_CATEGORIES:
      return { ...state, loading: true };
    case GET_RECEIVED_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: {
          root: action.root,
          principalCategory: action.principalCategory,
          childCategories: action.childCategories,
        },
      };
    case GET_RECEIVED_CATEGORIES_FAILURE:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
};

export default Api;
