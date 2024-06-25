const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./news.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
let news = [
  { id: "1", title: "Alchemist", body: "written by paulo coehlo", postImage: "no image" },
  { id: "2", title: "aadujeevitham", body: "benyamin", postImage: "no image" },
];

server.addService(newsProto.NewsService.service, {
  getAllNews: (_, callback) => {
    callback(null, { news: news }); 
  },
  addNews: (call, callback) => {
    const _news = { id: Date.now(), ...call.request };
    news.push(_news);
    callback(null, _news);
  },
  DeleteNews:(_,callback)=>{
    const newId=_.request.id;
    news = news.filter(({ id }) => id !== newId);
    callback(null, {});
  }
});

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error(`Error starting server: ${error}`);
    } else {
      console.log(`Server running at http://127.0.0.1:50051`);
    }
  }
);
