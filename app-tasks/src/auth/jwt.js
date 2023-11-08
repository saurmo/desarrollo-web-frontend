

export const getHeaders = (token) => {
  return { 'Authorization': `Bearer ${token}` }
}