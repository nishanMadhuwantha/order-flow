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
};

export function getRandomElement(arr: any) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export const getRandomDate = () => {
  const today = new Date();
  const priorDate = new Date();
  priorDate.setFullYear(today.getFullYear() - 1);
  const todayTs = today.getTime();
  const priorTs = priorDate.getTime();
  const randomTimestamp = Math.floor(
    Math.random() * (todayTs - priorTs) + priorTs
  );

  return new Date(randomTimestamp).toISOString().split('T')[0];
};

export const likeOperator = (source?: string, search?: string): boolean => {
  if (!search?.trim()) return true;
  if (!source) return false;

  return source.toLowerCase().includes(search.trim().toLowerCase());
};
