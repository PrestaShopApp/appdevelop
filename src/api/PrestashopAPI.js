import request from './request.js';
import { configuration } from '../utils/constants';

import { Buffer } from 'buffer';

/* 
https://prestashopappmobile.es/api/categories?filter[id]=[2,3]&display=full
URL took from configuration variables
Params:
url_resource: (string) products
display: (string) full
limit: (string) num_items
sort: (string)
filter: { (string) attribute, (string) value }
*/

function chooseURL(url_resource, display, limit, filter) {
  let url = `${configuration.httpConection}${configuration.urlShop}/${configuration.urlAPI}/${url_resource}?`;

  if (display) url = url + `&display=${display}`;
  if (limit) url = url + `&limit=${limit}`;
  if (filter) url = url + `&filter[${filter.attribute}]=${filter.value}`;

  return url + '&output_format=JSON';
}

export async function get_request(url_resource, display, limit, filter) {
  let url = chooseURL(url_resource, display, limit, filter);
  console.log('PrestashopAPI.js - URL - ', url);
  // Credentials : Authorization
  let apiKey = configuration.apiKey;
  let precursor = `${apiKey}:`;
  let credentials = Buffer.from(precursor).toString('base64');

  const headers = {};
  headers['Authorization'] = `Basic ${credentials}`;
  const options = {
    method: 'GET',
    headers,
  };

  console.log('PrestashopAPI.js - Start fetch');

  let response = await fetch(url, options);
  let data = await response.json();

  return data;
}
