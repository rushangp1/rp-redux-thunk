import React, { useEffect } from 'react'
import { Button, Card, Container, Grid, TextField, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { RootState, useAppDispatch } from '../../Redux/store';
import { cleanSelectedUser, getUserById } from '../../Redux/Slice/UsersSlice';
import { useSelector } from 'react-redux';

function AddEditUser() {
    const { userId } = useParams();
    const isEditMode = userId !== undefined;
    const dispatch = useAppDispatch();
    const userState = useSelector((state: RootState) => state.users.selectedUser);

    useEffect(() => {
        if (isEditMode) {
            dispatch(getUserById(Number(userId)))
        }
        return () => {
            dispatch(cleanSelectedUser())
        }
    }, []);

    return (
        <>
            <Link to='/users'>Back to users</Link>
            <Card style={{
                padding: '20px',
                width: '40%',
                marginLeft: '20%',
                marginTop: '10%'
            }}
            >
                <Container>
                    <Typography variant='h6' align='center'>{isEditMode ? "Add" : "Edit"} User</Typography>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField placeholder='Name' fullWidth value={userState.data.Name} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField placeholder='Email' fullWidth type='email' value={userState.data.Email} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField placeholder='Phone' fullWidth value={userState.data.Phone} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField placeholder='Company' fullWidth value={userState.data.Company} />
                            </Grid>
                            <Grid item >
                                <Button variant="contained" >Submit</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </Card>
        </>
    )
}

export default AddEditUser