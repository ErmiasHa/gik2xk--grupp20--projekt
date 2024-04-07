import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { Badge, Container, InputBase } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useRecoilState } from 'recoil';
import { authAtom } from '../atoms/authAtom';
import { useCart } from '../features/Cart/useCart';

const pages = [
  {
    name: 'Products',
    path: '/products',
  },
  {
    name: 'Admin',
    path: '/admin',
  },
];

function Header() {
  const navigate = useNavigate();
  const [{ isAuthenticated }, setState] = useRecoilState(authAtom);
  const { cart } = useCart();
  const [totalProduct, setTotalProduct] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Implementera logik för sökning här
    // Du kan använda searchQuery för att utföra sökningen
  };

  useEffect(() => {
    if (cart) {
      setTotalProduct(
        cart?.cartRows?.reduce((acc, curr) => acc + curr.amount, 0)
      );
    }
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setState({
      isAuthenticated: false,
      user: null,
    });
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            sx={{ mr: 1, display: 'flex', flexGrow: 1, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}
          >
            WEBSHOP
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                sx={{ mx: 1, color: 'green', fontSize: '15px' }} // Justerad stil för bättre synlighet
                component={NavLink}
                to={page.path}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '20%', maxWidth: 300 }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <IconButton type="submit" aria-label="search" onClick={handleSearchSubmit}>
              <SearchIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {!isAuthenticated && (
              <Button onClick={() => navigate('/auth')} sx={{ mx: 1, color: 'red', fontSize: '1rem' }}> {/* Justerad stil för bättre synlighet */}
                Login
              </Button>
            )}
            {isAuthenticated && (
              <Button onClick={handleLogout} sx={{ mx: 1, color: 'green', fontSize: '1rem' }}> {/* Justerad stil för bättre synlighet */}
                Logout
              </Button>
            )}
            <IconButton onClick={() => navigate('/cart')} color="inherit">
              <Badge badgeContent={totalProduct} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
