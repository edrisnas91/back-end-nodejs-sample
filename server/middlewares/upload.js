// const status = require('http-status');

const fileUpload = () => {
  // try {
  //   if (!req.files || Object.keys(req.files).length !== 0) {
  //     next();
  //   }
  //   for (const key of Object.keys(req.files)) {
  //     const file = req.files[key];
  //     const uri = `/uploads/${Date.now().valueOf().toString()}${file.name}`;
  //     const uploadPath = `${__dirname}/../..${uri}`;
  //     file.mv(uploadPath, (err) => {
  //       if (err) {
  //         next(err);
  //       }
  //     });
  //     req.body[key] = `/api${uri}`;
  //   }
  //   next();
  // } catch (err) {
  //   next(err);
  // }
};
module.exports = fileUpload;
