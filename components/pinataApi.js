import axios from "axios";
import { sendJsonHeader } from "./config";

export async function getDate() {
  const dateFormat = new Date(Date.now());
  const dateValue =
    dateFormat.getMonth() +
    1 +
    "." +
    dateFormat.getDate() +
    "." +
    dateFormat.getFullYear();
  const time = new Date(dateValue.split(".").join("-")).getTime() / 1000;
  return { dateValue, time };
}

export async function sendJSONToIPFS(data) {
  const fetchdate = await getDate();
  const listdate = fetchdate.dateValue;
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  var data = JSON.stringify({
    pinataMetadata: {
      name: "listed",
    },
    pinataOptions: {
      cidVersion: 1,
    },
    pinataContent: {
      PropertyInfo: {
        Title: data.gettitle,
        Price: data.getprice,
        Year: data.getyear,
        Address: data.getaddress,
        City: data.etcity,
        Country: data.getcountry,
        Zip: data.getzip,
        Hoa: data.gethoa,
        Info: data.getinfo,
        Floors: data.getfloors,
        Baths: data.getbaths,
        Rooms: data.getrooms,
        Garage: data.getgarage,
        Name: data.sellername,
        Email: data.selleremail,
        Phone: data.sellerphone,
        Listed: listdate,
        Picture:
          "https://" +
          ipfsgateway +
          ".mypinata.cloud/ipfs/" +
          data.picture +
          "?pinataGatewayToken=",
      },
    },
  });
  const resFile = await axios.post(url, data, sendJsonHeader);
  const hash = `ipfs://${resFile.data.IpfsHash}`;

  return "complete";
}

export async function getFileFromIPFS() {
  const queryFilter = "metadata[name]=listed";
  const url = "https://api.pinata.cloud/data/pinList?" + queryFilter;
  const resFile = await axios.get(url, getHeader)
  const response = resFile.data.rows;
  const output = response.map((value) => {
    let getCid = value.ipfs_pin_hash;
    return getCid;
  })
  return output;
} 


/*

PINATA IPFS FUNCTION TO READ THE FILES AFTER OBTAINING THE CID's

*/


export async function readFileFromIPFS() {
    const output = await getFileFromIPFS();
    const listArray = [];
    
    for (let i; i < output.length; i++) {
        const value = output[i];
        const ipfsPath = "https://" + ipfsgateway + ".mypinata.cloud/ipfs/" + value + '?pinataGatewayToken=' + pinatajwt;
        const info = await axios.get(ipfsPath, readHeader);
        console.log(info.data.PropertyInfo)
        listArray.push(info.data.PropertyInfo);
      }
      return listArray;
    }

/*

PINATA IPFS FUNCTION TO UPLOAD PICTURES AND FILES

*/

export async function sendFileToIPFS (file) {
        const formData = new FormData();
        const url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
        formData.append("file", file);
        const opts = JSON.stringify({
          cidVersion: 0,
        })
        formData.append('pinataOptions', opts);
        const options = {
          maxBodyLength: "Infinity",
          headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            pinata_api_key: pinatakey,
            pinata_secret_api_key: pinatasecret,
            Accept: 'text/plain',
        }
      }
        const resFile = await axios.post(url, formData, options);
        return resFile.data.IpfsHash
      }




