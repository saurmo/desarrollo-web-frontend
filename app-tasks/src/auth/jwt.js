

export const getHeaders = (token) => {
  return { headers: { 'Authorization': `Bearer ${token}` } }
}