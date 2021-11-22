import { GithubIcon, AiOutlineDashboard, TeamNoes, MediaIcon, LogoutIcon } from "../assets/icons";

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
        icon: <TeamNoes />
    },
];

export const SidebarItemsResources = [
    {
        name: "GitHub",
        link: `${GITHUB_LINK}`,
        icon: <GithubIcon />
    },
    {
        name: "Media",
        link: `${GITHUB_LINK}`,
        icon: <MediaIcon />
    },
]

export const SidebarItemsUser = [
    {
        name: "Logout",
        route: '/login',
        icon: <LogoutIcon />
    },
]

export default SidebarItemsMain;