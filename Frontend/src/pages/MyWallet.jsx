import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyWallet = () => {

  let navigate = useNavigate();

  const [userWalletAmount, setUserWalletAmount] = useState("");

  const user = JSON.parse(sessionStorage.getItem("active-user"));
  const [userId, setUserId] = useState(user.id);
  const [amount, setAmount] = useState("");

  const retrieveMyWallet = async () => {
    const response = await axios.get("http://localhost:8080/api/user/getMyWallet?userId="+userId);
    return response.data;
  };

  useEffect(() => {
    const getMyWallet = async () => {
      const res = await retrieveMyWallet();
      if (res) {
        setUserWalletAmount(res.amount);
      }
    };

    getMyWallet();
  }, []);

 

  const addAmouuntInCustomerWallet = (e) => {
    
    let data = { userId, amount };

    fetch("http://localhost:8080/api/user/addWallet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      console.warn("result", result);
      result.json().then((res) => {
        console.log("response", res);
        
        toast.success(res, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          window.location.reload(true);

      });
    });



  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "30rem" }}
        >
          <div className="card-header bg-color text-center custom-bg-text">
            <h4 className="card-title">My Wallet</h4>
          </div>
          <div className="card-body">
            <h3 className="text-center">Wallet Amount : Rs {userWalletAmount}</h3>
            <hr/>
            <br/>
            <h3 className="text-center">Add Amount in Wallet</h3>
            <form>
              

              <div className="mb-3 text-color">
                <label for="emailId" class="form-label">
                  <b>Enter Amount</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="emailId"
                  name="addedAmount"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  value={amount}
                />
              </div>
             
              <button
                type="submit"
                className="btn bg-color custom-bg-text"
                onClick={addAmouuntInCustomerWallet}
              >
                Add Amount
              </button>
              <ToastContainer />
            </form>

          </div>

          
          
                  </div>
      </div>
    </div>
  );
};

export default MyWallet;
