import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const AddCardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-user"));
  const priceToPay = location.state.priceToPay;
  const [userWalletAmount, setUserWalletAmount] = useState("");


  const retrieveMyWallet = async () => {
    const response = await axios.get("http://localhost:8080/api/user/getMyWallet?userId="+user.id);
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

  const payAndOrder = () => {
    fetch("http://localhost:8080/api/user/order?userId=" + user.id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log(res);

        
      });
    });
  };

  const payForOrder = () => {
 
    var doublePriceToPay = parseFloat(priceToPay);
    console.log(doublePriceToPay);

    var doubleUserWalletAmount = parseFloat(userWalletAmount);
    console.log(doubleUserWalletAmount);

    if(doublePriceToPay > doubleUserWalletAmount) {
       alert("Insufficient Amount In Wallet, Please add amount in Wallet");
       navigate("/user/mywallet");
    }

    else {
      payAndOrder();
      toast.success("Products Ordered Sucessfully!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/home");
    }

  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center">
        <div class="card form-card border-color" style={{ width: "25rem" }}>
          <div className="card-header bg-color custom-bg-text">
            <h5 class="card-title text-center">Payment Details</h5>
          </div>
          <div class="card-body text-color custom-bg">
            <form onSubmit={payForOrder}>
              <div class="mb-3">
                <label for="name" class="form-label">
                  <b>Amount To Pay</b>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  value={"Rs "+priceToPay}
                  required
                  readOnly
                />
              </div>
             
              <input
                type="submit"
                class="btn custom-bg-text bg-color"
                value={"Pay for Order"}
              />

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardDetails;
