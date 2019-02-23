import { stripAndTruncate } from './methods';

//Get the data of array of categories
export function getCategoriesData(data) {
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
  return childCategories;
}

//Get the data of one category
export function getCategoryData(data) {
  //Get data from principal category
  principalCategory = {
    id: data.id,
    idParent: data.id_parent,
    level_depth: data.level_depth,
    name: data.name[0].value,
    description: stripAndTruncate(data.description[0].value, 100),
  };
  return principalCategory;
}

//Get the data list of products
export function getProductsData(data) {
  let products = [];
  for (var i = 0; i < data.length; i++) {
    products.push({
      id: data[i].id,
      name: data[i].name[0].value,
      price: data[i].price,
      image: data[i].associations.images[0].id,
    });
  }
  return products;
}
