import { AiOutlineDashboard, BsCollection, LogoutIcon, GrAdd, IoSettingsOutline, WishListIcon } from "../assets/icons";


export const SidebarItemsMain = [

    {
        name: "Dashboard",
        route: '/',
        icon: <AiOutlineDashboard />
    },
    {
        name: "Collection",
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
        name: "Wishlist",
        link: '/wishlist',
        icon: <WishListIcon />
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