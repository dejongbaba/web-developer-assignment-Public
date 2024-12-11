export const selectUsersTemplate = `
SELECT *
FROM users
ORDER BY name
LIMIT ?, ?
`;

export const selectCountOfUsersTemplate = `
SELECT COUNT(*) as count
FROM users
`;

export const selectUsersWithAddressesTemplate = `
SELECT 
  users.id,
  users.name,
  users.username,
  users.email,
  users.phone,
  addresses.street,
  addresses.city,
  addresses.state,
  addresses.zipcode
FROM 
  users
LEFT JOIN 
  addresses
ON 
  users.id = addresses.user_id
ORDER BY 
  users.name
LIMIT ?, ?
`;
