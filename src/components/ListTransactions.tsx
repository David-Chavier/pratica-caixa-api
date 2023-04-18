import EditIcon from '@mui/icons-material/Edit';
import PaidIcon from '@mui/icons-material/Paid';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAll } from '../store/modules/transactions/TransactionsSlice';
import TransactionType from '../types/TransactionType';

const ListTransactions: React.FC = () => {
  const dispatch = useAppDispatch();
  const reduxTransactions = useAppSelector(selectAll);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = (item: TransactionType) => {
    setOpen(true);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Typography variant="h3" textAlign="center">
              Entradas
            </Typography>
            {reduxTransactions
              .filter(item => item.type === 'Entrada')
              .map(item => {
                return (
                  <React.Fragment key={item.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <PaidIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`R$ ${item.value}`} secondary={item.type} />
                      <IconButton onClick={() => handleEdit(item)}>
                        <EditIcon />
                      </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                );
              })}
          </List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Typography textAlign="center" variant="h3">
              Saidas
            </Typography>
            {reduxTransactions
              .filter(item => item.type === 'Saida')
              .map(item => {
                return (
                  <React.Fragment key={item.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <PaidIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`R$ ${item.value}`} secondary={item.type} />
                      <IconButton onClick={() => handleEdit(item)}>
                        <EditIcon />
                      </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                );
              })}
          </List>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Grid container sx={{ marginTop: '2rem' }}>
            <Paper
              sx={{
                minWidth: '300px',
                padding: '1rem'
              }}
            >
              <Box>
                <Typography variant="h4" align="center">
                  Transação
                </Typography>
              </Box>
              <Box
                component="form"
                sx={{
                  marginTop: 2,

                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-age-input"
                  label="Valor"
                  name="value"
                  type="number"
                  value={0}
                  // onChange={handleTransactions}
                />

                <RadioGroup
                  name="radio-buttons-group"
                  sx={{ display: 'inline' }}
                  // onChange={handleSelect}
                  value={'Entrada'}
                >
                  <FormControlLabel value="Entrada" control={<Radio />} label="Entrada" />
                  <FormControlLabel value="Saida" control={<Radio />} label="Saida" />
                </RadioGroup>

                {/* <Button
                                    type="button"
                                    variant="contained"
                                    disabled={!transactions.type || !transactions.value}
                                    onClick={onSave}
                                >
                                    Cadastrar
                                </Button> */}
                <Grid container>
                  <Grid item xs={6}>
                    <Button variant="contained" onClick={handleClose}>
                      Editar
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="contained" onClick={handleClose} autoFocus>
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Dialog>
      </Grid>
    </>
  );
};

export default ListTransactions;
