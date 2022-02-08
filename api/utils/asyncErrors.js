import DB from "../models/index.js";

const Chunks = DB.mongoose.connection.collection("avatars.chunks");
const Files = DB.mongoose.connection.collection("avatars.files");

export function catchAsyncErrors(callback){
    return (req, res, next) => {
        Promise.resolve(callback(req, res, next))
        .catch(async err => {
            let message = err.message;
            if(err.code === 11000){
                message = `User with email ${req.body.email} already exists`;
            }
            res.status(500).send({
                success:false,
                message
            });
            if(req.file){
                await Chunks.findOneAndDelete({files_id:req.file.id});
                await Files.findOneAndDelete({_id:req.file.id});
            }
            console.log(err.message);
        });
    }
}