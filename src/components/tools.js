const createPlaceholderWith = (thisProperty, thisValue) => ({
  [thisProperty]: thisValue || thisValue === '' ? thisValue : '-'
})    

export { createPlaceholderWith };