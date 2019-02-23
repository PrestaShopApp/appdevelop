// Function that return the data result depends if is root or specific category
// return [root, principalCategory, childCategories]
async function resolveDataAfterRequestCategory2(root, response) {
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
    if (!data.associations.categories) return [root, principalCategory, null];
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
