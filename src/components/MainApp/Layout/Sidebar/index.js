import { useContext, useState } from 'react'
import { AppContext } from '../../../Context/AppContext'
import { Link, useParams } from 'react-router-dom'
import useHooks from './hooks'
import { styled, useTheme } from '@mui/material/styles'
import Project from './Project'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import MaterialToolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ArchitectureIcon from '@mui/icons-material/Architecture'
import HomeIcon from '@mui/icons-material/Home'
import Collapse from '@mui/material/Collapse'
import LogoutIcon from '@mui/icons-material/Logout'
import Container from '@mui/material/Container'
import GroupIcon from '@mui/icons-material/Group'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import { Avatar } from './customComponents'

const drawerWidth = 240

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
    },
})

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    }),
}))


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
    }),
)

export const Toolbar = styled( MaterialToolbar ) `
    background: #6667ab !important;
`

export default function MiniDrawer(props) {
    const { myProjects, handleLogout, stringAvatar } = useHooks()
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const [openCollapse, setOpenCollapse] = useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const handleCollapse = () => {
        setOpenCollapse(!openCollapse)
    }

    const { username } = useParams()

    const { title, currentUser } = useContext( AppContext )

    return (
        <>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                }}
                >
                    <MenuIcon />
                </IconButton>
                <Container
                    sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                >
                <Typography variant="h6" noWrap component="div">
                    { title }
                </Typography>
                    <IconButton
                    color="inherit"
                    aria-label="logout"
                    onClick={handleLogout}
                    edge="end"
                    sx={{
                        ...(open && { display: 'none' }),
                    }}
                    >
                        <LogoutIcon />
                    </IconButton>
                </Container>
            </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem>
                    <ListItemIcon>
                        <Avatar {...stringAvatar(`${currentUser?.details?.first_name} ${currentUser?.details?.last_name}`)}/>
                    </ListItemIcon>
                    <ListItemText primary={`${currentUser?.details?.username}`} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key = 'Home' component = {Link} to = {`/app/${ username }/projects`} replace>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Home' />
                </ListItem>
            </List>
            { currentUser?.details?.is_admin && 
                <>
                    <Divider />
                    <List>
                        <ListItem button key = 'All Users' component = {Link} to = {`/app/${ username }/admin/users`} replace>
                            <ListItemIcon>
                                <GroupIcon/>
                            </ListItemIcon>
                            <ListItemText primary='All Users' />
                        </ListItem>
                    </List>
                    <List>
                        <ListItem button key = 'All Projects' component = {Link} to = {`/app/${ username }/admin/projects`} replace>
                            <ListItemIcon>
                                <AutoStoriesIcon/>
                            </ListItemIcon>
                            <ListItemText primary='All Projects' />
                        </ListItem>
                    </List>
                    <Divider />
                </>
            }
            <List>
                <ListItem button key = 'Projects' onClick = { handleCollapse }>
                    <ListItemIcon>
                            <ArchitectureIcon/>
                    </ListItemIcon>
                    <ListItemText primary='Projects' />
                </ListItem>
                <Collapse in={ openCollapse } timeout="auto" unmountOnExit>
                    <List>
                        { myProjects && 
                                myProjects
                                .map( project => {
                                    return <Project
                                                key = { project.id } 
                                                username = { username }
                                                project = { project }
                                                Link = { Link }
                                                ListItem = { ListItem }
                                                ListItemIcon = { ListItemIcon }
                                                ListItemText = { ListItemText }
                                            />
                                }) 
                            }
                    </List>
                </Collapse>
            </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {props.children}
            </Box>
            </Box>
        </>
        )
}