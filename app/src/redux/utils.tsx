export const delay = (waitSeconds, func) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(func())
    }, waitSeconds * 1000)
  })  
}