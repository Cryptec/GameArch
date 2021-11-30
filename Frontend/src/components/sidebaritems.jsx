import { AiOutlineDashboard, BsCollection, MediaIcon, LogoutIcon, GrAdd, IoSettingsOutline } from "../assets/icons";

const GITHUB_LINK = process.env.REACT_APP_GITHUB_LINK

export const SidebarItemsMain = [

    {
        name: "Dashboard",
        route: '/',
        icon: <AiOutlineDashboard />
    },
    {
        name: "Übersicht",
        route: '/overview',
        icon: <BsCollection />
    },
];

export const SidebarItemsResources = [
    {
        name: "Add Games",
        link: `/addgame`,
        icon: <GrAdd />
    },
    {
        name: "Media",
        link: `${GITHUB_LINK}`,
        icon: <MediaIcon />
    },
]

export const SidebarItemsUser = [
    {
        name: "Settings",
        route: '/settings',
        icon: <IoSettingsOutline />
    },
]

export const SidebarItemsLogout = [
    {
        name: "Logout",
        route: '/login',
        icon: <LogoutIcon />
    },
]

export default SidebarItemsMain;