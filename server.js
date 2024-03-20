const app = require("./src/app");

PORT = 9999

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// process là phương thức quy trình chạy của node
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Http server closed.');
  });
});