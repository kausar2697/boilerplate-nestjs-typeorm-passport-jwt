const devUrl ='http://localhost:3300';
// const liveUrl ='http://192.168.0.17:3000';
const liveUrl = 'https://api.ebhubon.com';

let temp = devUrl;
// console.log("process.env.NODE_ENV",process.env.NODE_ENV);
if (process.env.NODE_ENV == "production"){
  console.log("PROCESSS ENV CALLED",process.env.NODE_ENV)
  temp = liveUrl;
}

console.log("live or dev api base path ====",temp);

console.log('base path ====',process.cwd());
export const baseUrl = temp;