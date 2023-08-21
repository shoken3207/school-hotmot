import { Dispatch, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LinkWrap from './LinkWrap';
import TabIcon from '@mui/icons-material/Tab';

export default function MobileMenu({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const mobileMenuArray = [
    { text: 'ホーム', icon: <TabIcon />, path: '/Home' },
    { text: 'ブックマーク', icon: <TabIcon />, path: '/test' },
    { text: 'カート', icon: <PersonAddIcon />, path: '/Cart' },
    { text: '注文履歴', icon: <PersonAddIcon />, path: '/OrderHistory' },
  ];
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setIsOpen(open);
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {mobileMenuArray.map((mobileMenuItem) => (
          <LinkWrap href={mobileMenuItem.path} key={mobileMenuItem.text}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{mobileMenuItem.icon}</ListItemIcon>
                <ListItemText primary={mobileMenuItem.text} />
              </ListItemButton>
            </ListItem>
          </LinkWrap>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer anchor='left' open={isOpen} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
}
