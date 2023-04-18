import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import routes from '../routes/routes';
import { useAppSelector } from '../store/hooks';
import { selectAll } from '../store/modules/transactions/TransactionsSlice';

function ResponsiveAppBar() {
  const transactions = useAppSelector(selectAll);
  const navigate = useNavigate();

  const mostrarSaldo = () => {
    let saldo = 0;

    transactions.forEach(item => {
      if (item.type === 'Entrada') {
        saldo += Number(item.value);
      } else {
        saldo -= Number(item.value);
      }
    });
    return saldo;
    // const valorEntradas = transactions.filter((item) => item.type === "Entrada");
    // const saldoEntrada = valorEntradas.reduce((soma, valor) => soma + Number(valor.value), 0);
    // const valorSaidas = transactions.filter((item) => item.type === "Saida");
    // const saldoSaidas = valorSaidas.reduce((soma, valor) => soma + Number(valor.value), 0);

    // return saldoEntrada - saldoSaidas;
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (url: string) => {
    setAnchorElNav(null);
    navigate(url);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },

              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Minhas Transações
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {routes.map(page => (
                <MenuItem key={page.url} onClick={() => handleCloseNavMenu(page.url)}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Minhas Transações
          </Typography>

          <Box
            sx={{
              flexGrow: 4,
              display: { xs: 'none', md: 'flex' },
              justifyContent: { md: 'center' }
            }}
          >
            <Typography variant="h6">Saldo da conta R$ {mostrarSaldo()}</Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: { md: 'flex-end' }
            }}
          >
            {routes.map(page => (
              <Button
                key={page.url}
                onClick={() => handleCloseNavMenu(page.url)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
