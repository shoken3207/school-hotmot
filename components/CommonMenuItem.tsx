import React, { SetStateAction, Dispatch } from 'react';
import { ListItemIcon, ListItemText } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const CommonMenuItem = ({
  icon,
  text,
  onClickFunc,
  setAnchorEl,
}: {
  icon: React.ReactNode;
  text: string;
  onClickFunc: (args: any) => any;
  setAnchorEl: Dispatch<SetStateAction<boolean | null>>;
}) => {
  const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    onClickFunc(e);
    setAnchorEl(null);
  };
  return (
    <MenuItem onClick={(e) => onClick(e)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{text}</ListItemText>
    </MenuItem>
  );
};

export default CommonMenuItem;
