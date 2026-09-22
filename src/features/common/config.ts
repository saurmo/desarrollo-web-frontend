
// export const API_BASE_URL = "https://listings-api-one.vercel.app/api/"
export const API_BASE_URL =  process.env['NEXT_PUBLIC_API_BASE_URL']; 
export const PRIVATE_API_BASE_URL =  process.env['PRIVATE_API_BASE_URL']; 
console.log("API_BASE_URL", API_BASE_URL);
console.log("PRIVATE_API_BASE_URL", PRIVATE_API_BASE_URL);