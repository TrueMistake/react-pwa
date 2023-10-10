import React, {Suspense} from 'react';
import {NavLink, Outlet} from "react-router-dom";
import AuthStatus from "../components/Auth/AuthStatus.jsx";
import {Button, CircularProgress, Grid, List, ListItem} from "@mui/material";

const listUrl = [
  {
    name: 'Главная',
    url: '/'
  },
  {
    name: 'Герои',
    url: '/characters'
  },
  {
    name: 'Локации',
    url: '/location'
  },
  {
    name: 'Эпизоды',
    url: '/episode'
  },
]

const Layout = () => {
  return (
    <>
      <Grid item xs={1} sm={3}>
        <AuthStatus />
        <nav aria-label="main mailbox folders">
          <List>
            {listUrl.map(item => (
              <ListItem disablePadding key={item.name}>
                <Button component={NavLink} to={item.url}><strong>{item.name}</strong></Button>
              </ListItem>
            ))}
          </List>
        </nav>
      </Grid>
      <Grid item xs={1} sm={9}>
        <Suspense fallback={<CircularProgress />}>
          <Outlet/>
        </Suspense>
      </Grid>
    </>
  );
};

export default Layout;