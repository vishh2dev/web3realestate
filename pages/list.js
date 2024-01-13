import { sendJSONToIPFS, sendFileToIPFS } from "@/components/pinataApi"
import { useState } from "react"
import { ipfsgateway, pinatajwt } from "@/components/config";


export default function List() {
  const [picture, setPicture] = useState('')
  const [picCid, setPicCid] = useState('');
  const [data, setData] = useState({
    title: "",
    price: ""
  })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  console.log('data', data)

  async function updatePic(e) {
    const file = e.target.files[0];
    const getCid = await sendFileToIPFS(file);
    setPicCid(getCid);
    const ipfsPath = "https://" + ipfsgateway + ".mypinata.cloud/ipfs/" + getCid + '?pinataGatewayToken=' + pinatajwt;
    setPicture(ipfsPath);
  }


  async function listProperty() {
    let picture = picCid;
    let gettitle = document.getElementById("title").value.toString()
    let getprice = document.getElementById("price").value.toString()
    let getyear = document.getElementById("year").value.toString()
    let getcity = document.getElementById("city").value.toString()
    let getcountry = document.getElementById("country").value.toString()
    let getzip = document.getElementById("zip").value.toString()
    let gethoa = document.getElementById("hoa").value.toString()
    let getinfo = document.getElementById("info").value.toString()
    let getfloors = document.getElementById("floor").value.toString()
    let getaddress = document.getElementById("address").value.toString()
    let getbaths = document.getElementById("bath").value.toString()
    let getrooms = document.getElementById("room").value.toString()
    let getgarage = document.getElementById("garage").value.toString()
    let sellername = document.getElementById("sellername").value.toString()
    let selleremail = document.getElementById("selleremail").value.toString()
    let sellerphone = document.getElementById("sellerphone").value.toString()
    if (!gettitle || !getprice || !getyear || !getcity || !getcountry || !getzip || !gethoa || !getinfo ||
      !getfloors || !getbaths || !getrooms || !getgarage || !sellername || !selleremail || !sellerphone || !getaddress) return
    const receipt = await sendJSONToIPFS(gettitle, getprice, getyear, getcity, getcountry, getzip, gethoa, getinfo,
      getfloors, getbaths, getrooms, getgarage, sellername, selleremail, sellerphone, picture, getaddress)
    if (receipt == "complete") {
      let confirmation = 'Listed Successfully';
      document.getElementById('displayresult').innerHTML = confirmation
    }
    else {
      let confirmation = 'Info not completed';
      document.getElementById('displayresult').innerHTML = confirmation
    }
  }

  return (
    <div>
      <div className="container" style={{ fontFamily: 'SF Pro Display' }}>
        <div className="row g-6">
          {/* <div className="col-md-2 col-lg-2">
            <img className="mb-3 d-flex" src="net2dev.png" width="140" height="45" />
          </div> */}
          <div className="col-md-3 col-lg-9">
            <h4 className="mb-3 d-flex justify-content-start">Property Information</h4>
            <h5 className="d-flex justify-content-start align-items-right mt-2 mb-2">
              <span className="text-primary bold">New Listing Title</span>
            </h5>
            <div className="col-sm-7">
              <input

                className="form-control"
                id="title"
                onChange={handleChange}
                name="title"
                style={{
                  backgroundColor: "#d3d3d310",
                  fontWeight: "lighter",
                  color: "black",
                }}
              />
            </div>
            <h5
              className="d-flex justify-content-end"
              id="displayresult"
            />
            <form className="needs-validation" noValidate>
              <div className="row g-3">
                <div className="col-sm-2">
                  <label htmlFor="first" className="form-label">
                    Asking Price
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">$</span>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      name="price"
                      id="price"
                      style={{
                        backgroundColor: "#d3d3d310",
                        fontWeight: "lighter",
                        color: "black",
                      }}
                      required
                    />
                  </div>
                  <div className="invalid-feedback">Asking Price Required</div>
                </div>

                <div className="col-sm-2">
                  <label htmlFor="last" className="form-label">
                    Year Built
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">#</span>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      name="year"
                      id="year"
                      style={{
                        backgroundColor: "#d3d3d310",
                        fontWeight: "lighter",
                        color: "black",
                      }}
                      required
                    />
                  </div>
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
                <div className="col-sm-2">
                  <label className="form-label">
                    HOA
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">$</span>
                    <input
                      type="text"
                      className="form-control"
                      name="hoa"
                      onChange={handleChange}
                      id="hoa"
                      style={{
                        backgroundColor: "#d3d3d310",
                        fontWeight: "lighter",
                        color: "black",
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-5">
                  <label className="form-label">
                    Address
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      onChange={handleChange}
                      id="address"
                      style={{
                        backgroundColor: "#d3d3d310",
                        fontWeight: "lighter",
                        color: "black",
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-3">
                  <label className="form-label">
                    City
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      onChange={handleChange}
                      id="city"
                      style={{
                        backgroundColor: "#d3d3d310",
                        fontWeight: "lighter",
                        color: "black",
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <label className="form-label">
                    Country
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      className="form-control"
                      name="country"
                      onChange={handleChange}
                      id="country"
                      style={{
                        backgroundColor: "#d3d3d310",
                        fontWeight: "lighter",
                        color: "black",
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-3">
                  <label className="form-label">
                    Postal Code / Zip Code
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">#</span>
                    <input
                      type="text"
                      className="form-control"
                      name="zip"
                      onChange={handleChange}
                      id="zip"
                      style={{
                        backgroundColor: "#d3d3d310",
                        fontWeight: "lighter",
                        color: "black",
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-10">
                  <label className="form-label">
                    Additional information
                  </label>
                  <div className="form-group">
                    <textarea className="form-control" id="info" name="info" onChange={handleChange} rows="3"></textarea>
                  </div>
                </div>
              </div>
            </form>



            <div className="row g-6">
              <div className="col-sm-2 mt-3">
                <label htmlFor="country" className="form-label">
                  Floors
                </label>
                <div className="input-group has-validation">
                  <input
                    type="number"
                    className="form-control"
                    name="floor"
                    onChange={handleChange}
                    id="floor"
                    style={{
                      backgroundColor: "#d3d3d310",
                      fontWeight: "lighter",
                      color: "black",
                    }}
                    required
                  />
                </div>
              </div>
              <div className="col-sm-2 mt-3">
                <label htmlFor="country" className="form-label">
                  Rooms
                </label>
                <div className="input-group has-validation">
                  <input
                    type="number"
                    className="form-control"
                    name="room"
                    onChange={handleChange}
                    id="room"
                    style={{
                      backgroundColor: "#d3d3d310",
                      fontWeight: "lighter",
                      color: "black",
                    }}
                    required
                  />
                </div>
              </div>
              <div className="col-sm-2 mt-3">
                <label htmlFor="country" className="form-label">
                  Baths
                </label>
                <div className="input-group has-validation">
                  <input
                    type="number"
                    className="form-control"
                    name="bath"
                    onChange={handleChange}
                    id="bath"
                    style={{
                      backgroundColor: "#d3d3d310",
                      fontWeight: "lighter",
                      color: "black",
                    }}
                    required
                  />
                </div>
              </div>
              <div className="col-sm-2 mt-3">
                <label htmlFor="country" className="form-label">
                  Garage
                </label>
                <div className="input-group has-validation">
                  <input
                    type="number"
                    className="form-control"
                    name="garage"
                    onChange={handleChange}
                    id="garage"
                    style={{
                      backgroundColor: "#d3d3d310",
                      fontWeight: "lighter",
                      color: "black",
                    }}
                    required
                  />
                </div>
              </div>
            </div>
            <h6 id="displaysuccess" />
           
            <div className="row g-6">
              <h5 className="mt-3 mb-3 d-flex justify-content-start">
                Seller Info
              </h5>
              <div className="col-sm-4">
                <label htmlFor="email" className="form-label">
                  Name{" "}
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="sellername"
                  onChange={handleChange}
                  id="sellername"
                  style={{
                    backgroundColor: "#d3d3d310",
                    fontWeight: "lighter",
                    color: "black",
                  }}
                />
              </div>
              <div className="col-sm-3">
                <label htmlFor="email" className="form-label">
                  Email{" "}
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="selleremail"
                  onChange={handleChange}
                  id="selleremail"
                  style={{
                    backgroundColor: "#d3d3d310",
                    fontWeight: "lighter",
                    color: "black",
                  }}
                />
              </div>
              <div className="col-sm-3">
                <label htmlFor="email" className="form-label">
                  Phone{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="sellerphone"
                  onChange={handleChange}
                  id="sellerphone"
                  style={{
                    backgroundColor: "#d3d3d310",
                    fontWeight: "lighter",
                    color: "black",
                  }}
                />
              </div>
            </div>
            <h6>Add Property Picture</h6>
            <form
              className="card col-sm-4"
              style={{
                boxShadow: "0px 1px 5px #ffffff",
              }}
            >
              <h5
                className="d-flex justify-content-end"
                id="displaypicchanged"
              />
              <input
                style={{ backgroundColor: "transparent", color: "blue" }}
                className="btn btn-secondary d-flex justify-content-end"
                type="file"
                name="Asset"
                onChange={updatePic}
              />
            </form>
            <hr className="my-3" />
           {picture && <div className="row d-flex">
              <img
                className="bd-placeholder-img"
                src={picture}
                width="100%"
                height="100%"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              />
            </div>}
            <button
              className="w-100 btn btn-primary btn-md mt-4"
              style={{
                backgroundColor: "primary",
                fontWeight: "lighter",
                fontSize: "20px",
              }}
              onClick={listProperty}
            >
              List Property
            </button>
            <hr className="my-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
