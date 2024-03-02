import React from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { TbPhoneCalling } from "react-icons/tb";
import { FcNumericalSorting12 } from "react-icons/fc";
import { FcNumericalSorting21 } from "react-icons/fc";

const Profile = () => {
  const getBackgroundColor = (accountType) => {
    switch (accountType) {
      case "Admin":
        return "#8EAC50";
      case "HR":
        return "#0079FF";
      case "Employee":
        return "purple";
      default:
        return "#FF9B50";
    }
  };
  return (
    <div className="p-4">
      <div id="clear-both" />

      <div className="employee-card-holder">
        <div
          style={{
            boxShadow: "4px 4px 3px rgba(226, 223, 223, 0.608)",
            border: "1px solid rgba(226, 223, 223, 0.608) ",
            overflow: "hidden",
            maxWidth: "250px"
          }}
          className="card-top-upper position-relative bg-light text-center px-2 py-3  rounded-3  my-3"
        >
          <div>
            <div
              style={{
                width: "fit-content",
                right: "7%",
                top: "3%",
                position: "absolute",
                color: "white",
                zIndex: "1",
                cursor: "pointer"
              }}
            >
              <button
                // onClick={() => props.onEmpInfo(items.data)}
                className=" btn p-0 text-white"
                to=""
              >
                <IoMdInformationCircleOutline className="fs-4" />
              </button>
            </div>
          </div>
          <div
            className="card-top-upper"
            style={{
              position: "absolute",
              height: "30%",
              width: "100%",
              background: getBackgroundColor(),
              top: "0%",
              right: "0",
              borderRadius: "0% 0% 50% 50%",
              opacity: "80%"
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "0%",
              display: "flex",
              width: "94%",
              justifyContent: "space-between"
            }}
            className="div m-auto"
          >
            <button
              //   onClick={() => props.onEditEmployee(items.data)}
              style={{ zIndex: "1", cursor: "pointer" }}
              className="btn"
            >
              <FaRegEdit className="fs-4 text-primary bg-white p-1 rounded-5" />
            </button>
            <button
              //   onClick={() => onEmployeeDelete(items.data["_id"])}
              style={{ zIndex: "1", cursor: "pointer" }}
              className="btn"
            >
              <MdDeleteForever className="fs-4 text-danger bg-white p-1 rounded-5" />
            </button>
          </div>
          <div
            className="card-top-lower"
            style={{
              position: "absolute",
              height: "30%",
              width: "100%",
              background: getBackgroundColor(),
              bottom: "0%",
              right: "0",
              borderRadius: "50% 50% 0% 0% ",
              opacity: "30%"
            }}
          ></div>
          <div className="row mb-3">
            <div className="col-12 d-flex justify-center aline-center">
              <div
                style={{
                  height: "90px",
                  width: "90px",
                  overflow: "hidden",
                  borderRadius: "50%",
                  padding: "2px"
                }}
                className="profile-image bg-white "
              >
                <img
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover"
                  }}
                  className="m-auto"
                  src="https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
                  alt=""
                />
              </div>
            </div>
            <div className="col-12 text-start d-flex flex-column gap-0 text-center position-relative">
              <p
                style={{
                  fontSize: ".9rem",
                  width: "fit-content"
                }}
                className="m-auto my-2 text-uppercase  bg-warning px-2 rounded-5 text-white fw-bold"
              >
                {/* {items.empID} */}
              </p>
              <p className=" w-100 fs-5 m-auto fw-bolder text-uppercase text-primary">
                {/* {items.FirstName} {items.LastName} */}
              </p>
              <p className=" text-uppercase w-100 text-muted m-auto  fw-bold mb-3">
                {/* {items.PositionName} */}
              </p>
            </div>
            <div className="details d-flex flex-column gap-0">
              <a
                // href={`mailto:${items.Email}`}
                style={{
                  textShadow: "2px 2px 3px gray",
                  cursor: "pointer",
                  zIndex: "1",
                  opacity: "60%"
                }}
                className="m-auto bg-primary px-1 text-decoration-none my-auto d-flex text-white justify-center aline-center rounded-5 d-flex gap-2 aline-center"
              >
                <SiMinutemailer style={{ height: "100%" }} />
                <p
                  style={{ transition: "1s ease" }}
                  className="hover_number rounded-5 m-auto"
                >
                  {/* {items.Email} */}
                </p>
              </a>
              <a
                // href={`tel:${items.ContactNo}`}
                style={{
                  cursor: "pointer",
                  zIndex: "1",
                  opacity: "100%"
                }}
                className="m-auto mt-1 px-1 bg-white text-decoration-none my-auto d-flex text-muted justify-center aline-center rounded-5 d-flex gap-2 aline-center"
              >
                <TbPhoneCalling />
                {/* {items.ContactNo} */}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

