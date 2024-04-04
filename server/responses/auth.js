const adminAcess = (data) => ({
  id: `AD${parseInt(data.id, 10).toString().padStart(6, '0')}`,
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  username: data.username,
  accessType: data.accessType,
  status: data.status,
  token: data.token,
});

const clientAcess = (data) => ({
  id: `CL${parseInt(data.id, 10).toString().padStart(6, '0')}`,
  firstName: data.firstName,
  lastName: data.lastName,
  phone: data.phone,
  token: data.token,
});
const auth = {
  adminAcess,
  clientAcess,
};
module.exports = auth;
