import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import DashboardPage from "../pages/dashboard";
import SalesPage, { SalesLoader } from "../pages/sales";
import CategoriesPage from "../pages/categories";
import ProductPage, { ProductsLoader } from "../pages/product";
import CalendarPage, { EventsLoader } from "../pages/calendar";
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { useTheme } from "@emotion/react";
import AuctionPage, { AuctionLoader } from "../pages/auction";
const drawerWidth = 240;

const AppRoutes = ["Home", "Sales", "Categories", "Products", "Calendar", "Auction"]

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Root: React.FC = () => {
  const theme: any = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Akiba Street
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme?.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {AppRoutes.map(
              (text, index) => (
                <Link to={text.toLowerCase()} key={text}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              )
            )}
          </List>
          <Divider />
        </Drawer>
        <Main open={open}>
          <DrawerHeader />

          <Outlet />
        </Main>
      </Box>
    </>
  );
};

const UnexpectedError: React.FC = () => (
  <div>An unexpected error occurred, codexmaker will fix it soon.</div>
);

const MainRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route
          index
          element={<DashboardPage />}
          errorElement={<UnexpectedError />}
        />
        <Route
          path="/sales"
          element={<SalesPage />}
          loader={SalesLoader}
          errorElement={<UnexpectedError />}
        >
          Sales
        </Route>
        <Route
          path="/categories"
          element={<CategoriesPage />}
          errorElement={<UnexpectedError />}
        >
          Category
        </Route>
        <Route
          path="/products"
          element={<ProductPage />}
          loader={ProductsLoader}
          errorElement={<UnexpectedError />}
        >
          Products
        </Route>
        <Route
          path="/calendar"
          element={<CalendarPage />}
          loader={EventsLoader}
          errorElement={<UnexpectedError />}
        >
          Calendar
        </Route>
        <Route
          path="/auction"
          element={<AuctionPage />}
          loader={AuctionLoader}
          errorElement={<UnexpectedError />}
        >
          Calendar
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default MainRouter;
