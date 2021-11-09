import { GithubIcon, AiOutlineDashboard, MeetIcon, TeamNoes, MediaIcon } from "../assets/icons";

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

export const SidebarItemsEimag = [
    {
        name: "Korrektur",
        link: `${GITHUB_LINK}`,
        icon: <GithubIcon />
    },
]

export default SidebarItemsMain;