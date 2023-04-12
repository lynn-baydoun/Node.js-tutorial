//how to read a big file system and then send it to the client
const fs = require("fs");
const server = require("http").createServer();

//solution 1 (the simplest solution)
//this solution is bad because it uses a lot of memory; it is only good for small files that we want to use locally
server.on("request", (req, res) => {
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  //solution 2: streams
  //create a readable stream;as we receive each chunk of data we send it to the client
  //   const readable = fs.ReadStream("text-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found");
  //   });
  //the problem is that the readable stream reads data much faster than it can send the response to the writable stream over the network (this problem is called backpressure; cannot send the data nearly as fast as it is receiving it)
  //solution 3: using pipe operator
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  //readableSource.pipe(writableDestination)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening...💮");
});
