const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const Product = require('./src/models/Product');
const connectDB = require('./src/config/db');


const PROTO_PATH = 'product.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const productProto = grpc.loadPackageDefinition(packageDefinition).product;

function getProductById(call, callback) {
    connectDB();
    const productId = call.request._id;

    Product.findOne({_id: productId}).then((product) => {
        if (!product) {
            return callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
       
        callback(null, product);
    }).catch(err => {
        console.error("err", err);
        callback({
            code: grpc.status.INTERNAL,
            details: err.message
        });
    });
}

const server = new grpc.Server();
server.addService(productProto.ProductService.service, { getProductById });

const PORT = '50051';
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Server running at http://0.0.0.0:${port}`);
});