const flattenObject = (obj) => {
  const result = {};
  const traverse = (node, key) => {
    if (Object(node) !== node) {
      result[key] = node;
    } else if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i += 1) {
        traverse(node[i], `${key}[${i}]`);
      }
      if (node.length === 0) result[key] = [];
    } else {
      let isEmpty = true;
      Object.keys(node).forEach((p) => {
        isEmpty = false;
        traverse(node[p], key ? `${key}.${p}` : p);
      });
      if (isEmpty) result[key] = {};
    }
  };
  traverse(obj, '', result);
  return result;
};

const unflattenObject = (obj) => {
  if (Object(obj) !== obj || Array.isArray(obj)) return obj;
  const regex = /\.?([^.[\]]+)|\[(\d+)\]/g;
  const result = {};
  // for (const p in obj) {
  Object.keys(obj).forEach((p) => {
    let node = result;
    let key = '';
    let arr;
    do {
      arr = regex.exec(p);
      if (arr) {
        node = node[key] || (node[key] = (arr[2] ? [] : {}));
        key = arr[2] || arr[1];
      }
    } while (arr);
    node[key] = obj[p];
  });
  return result[''] || result;
};

const combineParams = (acc, cur) => {
  const { paramKey, paramValue } = cur || acc;
  if (paramKey) {
    return {
      ...acc,
      [paramKey]: paramValue,
    };
  }
  return acc;
};

const objectFormat = obj => ({
  paramKey: obj[0],
  paramValue: obj[1],
});

const parseTemplate = (array) => {
  if (array && Array.isArray(array) && array.length) {
    return array.reduce((acc, cur) => {
      const { name, children, isList } = cur;
      const childList = parseTemplate(children);
      if (name) {
        const result = {
          ...acc,
          [name]: (isList ? [] : ''),
        };
        if (isList && childList) {
          result[name] = result[name].concat(childList);
        } else if (isList) {
          result[name] = result[name].concat('');
        } else if (childList) {
          result[name] = childList;
        }
        return result;
      }
      return acc;
    }, {});
  }
  return null;
};

const serialize = (o) => {
  const flatOutput = flattenObject(o);
  // console.log('========Flatten Object========');
  // console.log(flatOuput);
  const serialOutput = Object.entries(flatOutput).map(objectFormat);
  // console.log('========Serialized Object========');
  // console.log(serialOutput);
  return serialOutput;
};

const deserialize = (data) => {
  const flatInput = data.reduce(combineParams, {});
  // console.log('========Flatten Object========');
  // console.log(flatInput);
  const obj = unflattenObject(flatInput);
  // console.log('========Deserialized Object========');
  // console.log(obj);
  return obj;
};

export { serialize, deserialize, parseTemplate };
