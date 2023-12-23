import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewAllManagers = () => {
  const [allManagers, setAllManagers] = useState([]);

  useEffect(() => {
    const getAllManager = async () => {
      const allManager = await retrieveAllManagers();
      if (allManager) {
        setAllManagers(allManager);
      }
    };

    getAllManager();
  }, []);

  const retrieveAllManagers = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/manager/all"
    );
    console.log(response.data);
    return response.data;
  };

  const deleteManager = (userId, e) => {
    const response = axios.get(
      "http://localhost:8080/api/user/manager/remove?userId=" + userId
    );

    console.log(response);
    window.location.reload(true);
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color "
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header custom-bg-text text-center bg-color">
          <h2>All Managers</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Address</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allManagers.map((manager) => {
                  return (
                    <tr>
                      <td>
                        <b>{manager.firstName}</b>
                      </td>
                      
                      <td>
                        <b>{manager.lastName}</b>
                      </td>
                      <td>
                        <b>{manager.emailId}</b>
                      </td>
                      <td>
                        <b>{manager.phoneNo}</b>
                      </td>
                      
                      <td>
                        <b>{manager.address.street+" "+manager.address.city+" "+manager.address.pincode}</b>
                      </td>
                      <td>
                        <button
                          className="btn bg-color custom-bg-text btn-sm"
                          onClick={() => deleteManager(manager.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllManagers;
