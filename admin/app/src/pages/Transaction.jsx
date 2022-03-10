import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrderFunc, getOrderFunc } from "./../redux/orders";
import { useNavigate } from 'react-router';

const Container = styled.div``;
const SideBySide = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  width: 85vw;
`;
// const UserTopContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;
const Title = styled.h1`
  color: #252525;
  font-weight: 500;
  font-size: 20px;
`;
const CreateButton = styled.button`
  display: flex;
  height: 32px;
  width: 70px;
  color: white;
  font-weight: 300;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  background-color: #6d6d6d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const ButtonIconContainer = styled.div`
  display: flex;
`;
const ButtonIcon = styled.div`
  cursor: pointer;
  margin: 5px;
  &:hover {
    transform: scale(1.1);
  }
  display: flex;
  justify-content: center;
  align-item: center;
`;
const DashBoardTitle = styled.div`
  /* Created with https://www.css-gradient.com */
  background: #ffffff;
  background: -webkit-radial-gradient(center, #ffffff, #d8d8d8);
  background: -moz-radial-gradient(center, #ffffff, #d8d8d8);
  background: radial-gradient(ellipse at center, #ffffff, #d8d8d8);
  width: inherit;
  padding: 10px 0px 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ImageContainer = styled.div`
  height: 50px;
  width: 50px;
`;
const Image = styled.img`
  height: 50px;
  width: 50px;
`;

const Transaction = () => {
  //Get all transaction/order from redux
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getOrderFunc(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "Order ID", width: 210 },
    {
      field: "user_ID",
      headerName: "User ID",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
    },
    {
        field: "createdAt",
        headerName: "Creation Time",
        width: 200,
      },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <ButtonIconContainer>
            <Link
              style={{ textDecoration: "none" }}
              to={"/transaction/" + params.row._id}
            >
              <ButtonIcon>
                <EditIcon />
              </ButtonIcon>
            </Link>
            <ButtonIcon onClick={() => handleCancel(params.row._id)}>
              <DeleteOutlineIcon />
            </ButtonIcon>
          </ButtonIconContainer>
        );
      },
    },
  ];

  const handleCancel = (_id) => {
    deleteOrderFunc(dispatch, navigate, _id);
  };

  return (
    <Container>
      <Navbar />
      <SideBySide>
        <Sidebar />
        <Wrapper>
          <DashBoardTitle>
            <Title>Transaction List</Title>
          </DashBoardTitle>
          <DataGrid
            rows={orders}
            columns={columns}
            // rowsPerPageOptions={5}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row._id}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick
          />
        </Wrapper>
      </SideBySide>
    </Container>
  );
};

export default Transaction;
