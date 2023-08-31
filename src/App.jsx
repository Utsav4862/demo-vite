import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { addData, deleteData } from "./store/slices/DataSlice";
import {
  useGetAllProductsQuery,
  useGetProductBySearchQuery,
} from "./store/slices/apiSlice";
import InstallButton from "./components/InstallPrompt";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
import axios from "axios";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const [inp, setInp] = useState();
  const [prod, setProd] = useState([]);
  const { data: initialProd } = useGetAllProductsQuery();
  const { data: searchedProd } = useGetProductBySearchQuery(inp);

  async function reqPer(){
    const per = await Notification.requestPermission()
    if(per === "granted"){
      const token = await getToken(messaging, {vapidKey:"BGpF8EDbvTCOF_S7hHWRuaAjnKtQ6_mJijz9GkiXLKmeP8iPjumY62ByicbDlbDS45VQ3aWfPU3Wu4XBtbEzFAY"})
      console.log("adeasd");
      console.log(token);
        //send token here...
    } 
  }

  useEffect(()=>{
    reqPer()

  },[])
 
  const searchProduct = () => {
    if (searchedProd) {
      setProd(searchedProd);
    }
  };

  useEffect(() => {
    if (initialProd) {
      setProd(initialProd);
    }
  }, [initialProd]);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    if (width <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  return (
    <>
      <div style={{ textAlign: "center", width: "100%" }}>
        <div
          style={{
            marginTop: 15,
            marginBottom: 15,
            justifyContent: "center",
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
          }}
        >
          <input
            type="text"
            style={{
              height: 30,
              width: "80%",
              borderRadius: 15,
              paddingLeft: 10,
            }}
            value={inp}
            onChange={(e) => setInp(e.target.value)}
          />
          <button onClick={searchProduct}> Search </button>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
            justifyContent: "center",
            width: "100%",
          }}
        >
          {prod?.products?.map((item, index) => (
            <div key={item.id} style={{ height: 400, width: 400, padding: 5 }}>
              <div style={{ height: "80%" }}>
                <img
                  src={item.images[0]}
                  style={{
                    maxWidth: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <h2 style={{ textAlign: "center" }}>{item.title}</h2>
              <hr />
            </div>
          ))}
        </div>
      </div>
      {isMobile ? <InstallButton width={width} /> : ""}
    </>
  );
}

export default App;
