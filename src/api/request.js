import fetch from 'isomorphic-unfetch';

export default function request(reqData) {
  return new Promise((resolve, reject) => {
    const headers = {};
    let url = 'https://prestashopappmobile.es/api';
    let end_url = '?output_format=JSON';
    let url_fetch = url + reqData.url + end_url;
    // Credentials : Authorization
    let apiKey = 'SDH58DMHMPMAZAAEVAZEVDQ1W318ICBY';
    let password = '';
    let precursor = `${apiKey}:${password}`;
    let credentials = Buffer.from(precursor).toString('base64');

    headers['Authorization'] = `Basic ${credentials}`;
    console.log('request.js : req.url - ', reqData.url);
    const options = {
      method: reqData.method,
      headers,
    };

    if (reqData.body != undefined) {
      options.body = JSON.stringify(reqData.body);
    }

    fetch(url_fetch, options).then(response => {
      return new Promise(resolveFetch => resolveFetch(response.text()))
        .then(responseBody => {
          if (response.status == '204') {
            resolve({ status: 204 });
          }

          if (response.ok) {
            resolve({ status: response.status, ...JSON.parse(responseBody) });
          } else {
            let data = {};
            try {
              data = JSON.parse(responseBody);
            } catch (error) {
              data = {
                error: response.statusText.toUpperCase().replace(/ /g, '_'),
              };
            }
            reject({
              status: response.status,
              ...data,
            });
          }
        })
        .catch(err => {
          if (response.status == '204') {
            resolve({
              status: response.status,
            });
          }
          reject({
            status: response.status,
            error: 'ERROR_INVALID_DATA',
          });
        });
    });
  });
}
