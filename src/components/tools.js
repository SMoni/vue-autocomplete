const createPlaceholderWith = (thisProperty, thisValue) => {
  return {
    [thisProperty]: thisValue || thisValue === '' ? thisValue : '-'
  };
}    

export { createPlaceholderWith };