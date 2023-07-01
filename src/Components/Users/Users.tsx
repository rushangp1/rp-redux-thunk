import React, { useEffect } from "react";
import {
    Button,
    Card,
    Typography,
    Container,
    Table,
    TableRow,
    TableContainer,
    Paper,
    TableHead,
    TableCell,
    TableBody,
} from "@mui/material";
import { AppDispatch, RootState, useAppDispatch } from "../../Redux/store";
import { getUsers } from "../../Redux/Slice/UsersSlice";
import { useSelector } from "react-redux";
import { ApiProcessState } from "../../Redux/State/ApiState";
import { useNavigate } from "react-router";

function Users() {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate()
    const usersState = useSelector((state: RootState) => state.users.users);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <Card>
            <Container style={{ padding: "20px" }}>
                <Typography variant="h5">Users</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow >
                                <TableCell>
                                    <Typography fontWeight="bold">User Id</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight="bold">Name</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight="bold">Email</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight="bold">Phone</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight="bold">Company</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight="bold">Actions</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersState.state === ApiProcessState.Success &&
                                usersState.data.map((user, key) => {
                                    return (
                                        <TableRow key={key}>
                                            <TableCell>{user.Id}</TableCell>
                                            <TableCell>{user.Name}</TableCell>
                                            <TableCell>{user.Email}</TableCell>
                                            <TableCell>{user.Phone}</TableCell>
                                            <TableCell>{user.Company}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => {
                                                    navigate(`/users/${user.Id}`)
                                                }}
                                                    variant="contained"

                                                >Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Card>
    );
}

export default Users;
