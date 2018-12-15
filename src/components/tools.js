const createPlaceholderWith = (thisProperty, thisValue) => {

  const placeholder = {};

  placeholder[thisProperty] = thisValue || thisValue === '' ? thisValue : '-'; 

  return placeholder;
}    

export { createPlaceholderWith };