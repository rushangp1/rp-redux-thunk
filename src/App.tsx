import React from 'react';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from './Redux/store';
import LoadingSpinner from './Components/Common/LoadingSpinner';
import Router from './Components/Router';

function App() {
  const isLoading: boolean = useSelector<RootState, boolean>(state => state.app.isLoading)

  return (
    <div className="App">
      <Container>
        {isLoading && <LoadingSpinner />}
        <Router />
      </Container>
    </div>
  );
}

export default App;
