
export const getQueryParam = (queryParam: any = {}) => {
  let queryPath = '';
  const queryValueArray = [];
  for (const [key, valueObj] of Object.entries(queryParam)) {
    if ((valueObj || valueObj === 0) && valueObj !== '') {
      queryValueArray.push(`${key}=${valueObj}`);
    }
  }
  if (queryValueArray.length > 0) {
    queryPath = queryValueArray.join('&');
  }

  return queryPath;
};

export const toCapitalizeString = (str: string) => {
  if (!str) return '';
  const lowercased = str.toLowerCase();
  return lowercased.charAt(0).toUpperCase() + lowercased.slice(1);
};

export const isObject = (object: any) => {
  return typeof object === 'object' && object !== null;
}