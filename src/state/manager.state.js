
  export const filterState = (state, allowStateProperties) =>{

    const filtered = Object.keys(state)
        .filter(key => allowStateProperties.includes(key))
        .reduce((obj, key) => {
        return {
        ...obj,
        [key]: state[key]
        };
    }, {});

    return filtered;

}