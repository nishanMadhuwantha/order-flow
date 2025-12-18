import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";


interface Props {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  onExited: () => void;
}


export default function ConfirmationDialog({
                                             open,
                                             title,
                                             description,
                                             onConfirm,
                                             onCancel,
                                             onExited
                                           }: Props) {
  return (
    <Dialog open={open} onClose={onCancel} TransitionProps={{
      onExited,
    }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}