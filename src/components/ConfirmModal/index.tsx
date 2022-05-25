import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, DialogProps } from "@mui/material";

export interface ConfirmModalProps {
    isOpen: boolean
    title: string
    description?: string
    onReject?: () => void
    onResolve?: () => void
}

export const ConfirmModal: React.FC<ConfirmModalProps> = (props) => (
    <Dialog
        open={props.isOpen}
        onClose={props.onReject}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.onReject}>
            Отменить
          </Button>
          <Button onClick={props.onResolve} autoFocus>
            Подвердить
          </Button>
        </DialogActions>
      </Dialog>
)