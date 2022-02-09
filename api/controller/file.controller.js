import DB from "../models/index.js";
import dotenv from "dotenv";

dotenv.config();

const GridFSBucket = DB.mongoose.mongo.GridFSBucket;

//download receives file name as input parameter
export const download = async (req, res) => {
    try {
        await DB.mongoose.connect(process.env.CONNECTION_URL);
  
      const bucket = new GridFSBucket(DB.mongoose.connection, {
        bucketName: "photos",
      });

  
      let downloadStream = bucket.openDownloadStreamByName(req.params.name);
      downloadStream.on("data", data => {
        res.write(data);
      });

      downloadStream.on("error", function (err) {
          console.log(err);
        return res.status(404).send({ message: "Cannot download the Image!" });
      });
      
    
      downloadStream.on("end", () => {
        res.end();
      });

    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
};