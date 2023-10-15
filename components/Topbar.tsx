import React, {
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Avatar, Badge, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from '../firebase/main';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userData/userDataSlice';
import CommonMenu from './CommonMenu';
import CommonDialog from './CommonDialog';
import ProfileBox from './ProfileBox';
import { POPUP_TYPE } from '../const';

const Topbar = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const user = useSelector((state: RootState) => state.userData);
  const topBarRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const basePath = router.pathname.split('/')[1];
  const [openPopup, setOpenPopup] = useState<number | undefined>(undefined);
  const [topBarHeight, setTopBarHeight] = useState<number | undefined>(0);

  const menuArray = [
    {
      text: 'ログアウト',
      icon: <LogoutIcon />,
      onClickFunc: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        logoutFunc(e),
    },
    {
      text: 'プロフィールを表示',
      icon: <LogoutIcon />,
      onClickFunc: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
        setOpenPopup(POPUP_TYPE.DISP_PROFILE),
    },
  ];

  const logoutFunc = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    auth.signOut();
    dispatch(logout());
    sessionStorage.removeItem('user');
    router.push('/');
  };

  useEffect(() => {
    setTopBarHeight(topBarRef.current?.clientHeight);
  }, [router.pathname]);
  console.log('bathPath: ', basePath);
  return (
    <div style={{ paddingTop: topBarHeight }}>
      <AppBar
        ref={topBarRef}
        position='fixed'
        color='primary'
        sx={{ bottom: 'auto', top: 0 }}
      >
        <Toolbar>
          {user.id && (basePath === 'ProductDetail' || basePath === 'Cart') ? (
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={() => router.back()}
            >
              <ArrowBackIosIcon />
            </IconButton>
          ) : (
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={() => setIsOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, color: '#fff' }}
          >
            ToDo App
          </Typography>
          {basePath !== 'Cart' && (
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={() => router.push('/Cart')}
            >
              <Badge color='secondary' badgeContent={user.cart?.details.length}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}
          <CommonMenu menuArray={menuArray}>
            <Avatar> {user.name && user.name.split('')[0]}</Avatar>
          </CommonMenu>
          {user.id && user.email && user.name && (
            <CommonDialog
              isOpen={openPopup === POPUP_TYPE.DISP_PROFILE}
              setIsOpen={setOpenPopup}
            >
              <ProfileBox
                id={user.id}
                email={user.email}
                username={user.name}
                iconChar={user.name && user.name.split('')[0]}
              />
            </CommonDialog>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Topbar;
