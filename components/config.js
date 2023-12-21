export const readHeader = {
   "Content-Type": "application/json"
}

export const getHeader = {
    headers:{
        pinata_api_key:process.env.API_KEY,
        pinata_secret_api_key:process.env.API_SECRET
    }
}

export const sendJsonHeader = {
    headers:{
        "Content-Type": "application/json",
        pinata_api_key:process.env.API_KEY,
        pinata_secret_api_key:process.env.API_SECRET
    }
}