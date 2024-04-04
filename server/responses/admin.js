const adminAcess = (data) => ({
  id: `AD${parseInt(data.id, 10).toString().padStart(6, '0')}`,
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  username: data.username,
  accessType: data.accessType,
  status: data.status,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});
const admin = {
  adminAcess,
};
module.exports = admin;
