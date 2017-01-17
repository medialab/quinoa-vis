/**
 * Maps incoming data with provided data map
 * @param {array} data - list of time objects
 * @param {object} dataMap - list of correspondance between output data needs and input data key names / accessors fns
 * @param {string} dataStructure - expression specifying how data is structured
 * @return {array} newData - ready-to-be-used data
 */
const mapData = (data, dataMap, dataStructure = 'flatArray') => {
  if (dataStructure === 'flatArray') {
    return data.map(datapoint => {
      return Object.keys(dataMap).reduce((obj, dataKey) => {
        return {
          ...obj,
          [dataKey]: typeof dataMap[dataKey] === 'function' ?
                      dataMap[dataKey](datapoint) // case accessor
                      : datapoint[dataMap[dataKey]] // case prop name
        };
      }, {});
    });
  }
  else {
    return data;
  }
};

/**
 * Compute multiple map-related representations and utils out of a couple of data+dataMap
 * @param {array} inputData - initial data
 * @param {object} dataMap - list of correspondance between output data needs and input data key names / accessors fns
 * @param {object} viewParameters - initial view parameters
 * @return {array} stateRepresentation - invariant timeline-related state elements to be used when initing / reloading data or dataMap into component
 */
export const computeDataRelatedState = (inputData, dataMap, viewParameters, dataStructure) => {
    const data = mapData(inputData, dataMap, dataStructure);
    return {
      data,
      viewParameters
    };
};
