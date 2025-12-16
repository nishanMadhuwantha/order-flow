import { SnackbarProvider, useSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import React from 'react';

const SnackbarCloseButton = ({ id }: { id: string | number }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton size="small" onClick={() => closeSnackbar(id)}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};

const AppSnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      action={(key) => <SnackbarCloseButton id={key} />}
    >
      {children}
    </SnackbarProvider>
  );
};

export default AppSnackbarProvider;
