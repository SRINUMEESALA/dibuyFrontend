
import { Link, withRouter } from "react-router-dom"
import { useState } from 'react';
import Cookies from "js-cookie";
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FcNext } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { MdSell, MdAdminPanelSettings } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import { GrHistory } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsChatRightDotsFill } from "react-icons/bs";
import { deepOrange } from '@mui/material/colors';
import { BiRupee } from "react-icons/bi";
import "./index.css"
import DiBuyContext from "../../context/DiBuyContext";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Dialog from '@mui/material/Dialog';
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { useEffect } from "react";
import { serverUrl } from "../../sources";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));




const screenSize = window.innerWidth
const navItems = [{ item: "Products", id: 1, path: "/products" }, { item: "Seller Corner", id: 2, path: "/sellercorner" }, { item: "Cart", id: 3, path: "/cart" }]
const openingSide = "right";
const Header = (props) => {
    const [state, setState] = useState({ "right": false });
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState("RadheKrishna")
    const sliderSize = screenSize < 768 ? 170 : 250;

    // console.log(currentUser)

    const getUserEmail = async () => {
        try {
            const url = `${serverUrl}/user/getemail`
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwtToken")}`,
                    "content-type": "application/json"
                }
            }
            const response = await fetch(url, options)
            const result = await response.json()
            setCurrentUser(result.email)
        } catch (err) {
            console.log("Could not get email of the user", err)
        }
    }

    useEffect(() => {
        getUserEmail()
    }, [])

    const logout = () => {
        Cookies.remove("jwtToken")
        const { history } = props
        history.replace("/user/login")
    }

    const handleClickOpen = () => {
        setOpen(true);
        setTimeout(() => {
            logout()
            setOpen(false)
        }, 3000)
    };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const toggleDrawer = (openingSide, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ [openingSide]: open });
    };

    const renderCart = () => (<>
        <DiBuyContext.Consumer>
            {value => {
                const { cartCount } = value
                return (
                    <IconButton aria-label="cart">
                        <StyledBadge badgeContent={cartCount} color="secondary">
                            <ShoppingCartIcon color="info" />
                        </StyledBadge>
                    </IconButton>
                )
            }}
        </DiBuyContext.Consumer>

    </>)


    const slide = (openingSide, size) => (
        <Box
            sx={{ width: size }}
            role="presentation"
            onClick={toggleDrawer(openingSide, false)}
            onKeyDown={toggleDrawer(openingSide, false)}
        >
            <List>
                {[{ displayText: 'Account', icon: <Avatar alt="RadheKrishna" sx={{ width: 24, height: 24, margin: 0, padding: 0, bgcolor: deepOrange[500] }} >{currentUser[0]}</Avatar>, path: "/user/account" }, { displayText: 'Orders', icon: <GrHistory className="h5 m-0" />, path: "/orders" }, { displayText: 'ChatUs', icon: <BsChatRightDotsFill className="h5 m-0" />, path: "/chatus" }, { displayText: "DashBoard", icon: <MdSell className="h5 m-0" />, path: "/seller/dashboard" }, { displayText: "Fair Price", icon: <BiRupee className="h5 m-0" />, path: "/fair-price" }, { displayText: "Admin", icon: <MdAdminPanelSettings className="h5 m-0" />, path: "/admin" }].map((obj, index) => (
                    <Link to={obj.path} className="link" key={obj.displayText}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {obj.icon}
                                </ListItemIcon>
                                <ListItemText primary={obj.displayText} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {[{ displayText: 'Logout', icon: <FiLogOut className="h5 m-0" />, }].map((obj, index) => (
                    <ListItem key={obj.displayText} disablePadding>
                        <ListItemButton onClick={handleClickOpen}>
                            <ListItemIcon>
                                {obj.icon}
                            </ListItemIcon>
                            <ListItemText primary={obj.displayText} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    return (
        <DiBuyContext.Consumer>
            {
                value => {
                    const { currentRoute, setCurrentRoute } = value
                    return (
                        <>
                            <div className="d-none d-md-block shadow">
                                <div className="navParentCon d-flex justify-content-center text-white">
                                    <div className="navbarCon d-flex justify-content-between">
                                        <h1 className="pt-2 pb-2"><Link to="/" className="navLink" onClick={() => setCurrentRoute("")}><span className="websiteNativeColor">Di</span>Buy</Link></h1>
                                        <div className="d-flex">
                                            <ul className="list-unstyled d-flex m-0">
                                                {navItems.map(eachItem => <li className={currentRoute === eachItem.path ? "mr-3 websiteNativeBgColor p-2 d-flex align-items-center navItem justify-content-center" : "mr-3 d-flex align-items-center navItem justify-content-center"} key={eachItem.id} onClick={() => setCurrentRoute(eachItem.path)}><Link to={eachItem.path} className="navLink"><span>{eachItem.item}</span>{eachItem.item === "Cart" && renderCart()}</Link></li>)}
                                            </ul>
                                            <button className="btn text-white align-self-center" type="button" onClick={toggleDrawer(openingSide, true)}>More <FcNext className="text-light m-0 font-weight-bold" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-md-none">
                                <nav className="navbar navbar-light bg-light">
                                    <h1 className="pt-2 pb-2 h3"><Link to="/" className="navLink" onClick={() => setCurrentRoute("")}><span className="websiteNativeColor">Di</span>Buy</Link></h1>
                                    <div className="">
                                        <button className="btn mr-2" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                            <GiHamburgerMenu className="h2 m-0 text-info" />
                                        </button>
                                        <button className="btn text-white align-self-center" type="button" onClick={toggleDrawer(openingSide, true)}> <RiAccountCircleFill className="text-info h2 m-0 font-weight-bold" /></button>
                                    </div>
                                    <div className="collapse navbar-collapse" id="navbarNav">
                                        <ul className="navbar-nav text-center">
                                            {navItems.map(eachItem => <li className={currentRoute === eachItem.path ? "mr-3 websiteNativeBgColor p-2" : "mr-3"} key={eachItem.id} onClick={() => setCurrentRoute(eachItem.path)}><Link to={eachItem.path} className="navLink"><span>{eachItem.item}</span></Link></li>)}
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                            <Drawer
                                anchor={openingSide}
                                open={state[openingSide]}
                                onClose={toggleDrawer(openingSide, false)}
                            >
                                {slide(openingSide, sliderSize)}
                            </Drawer>
                            <Dialog
                                open={open}
                            >
                                <div className="logoutCon d-flex flex-column justify-content-between">
                                    <h1 className="text-danger h3 text-center">See you soon!</h1>
                                    <div className="text-center">
                                        <Loader type="TailSpin" color="#FF5454" height={80} width={80} />
                                    </div>
                                    <small className="text-secondary text-center w-100">Logging you out...</small>
                                </div>
                            </Dialog>
                        </>

                    )
                }
            }
        </DiBuyContext.Consumer>
    )
}


export default withRouter(Header)
