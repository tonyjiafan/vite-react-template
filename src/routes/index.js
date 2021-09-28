import Home from "@/views/home/Home"
import User from "@/views/user/User"
 
const routes = [
    {
        path: "/",
        exact: true,
        component: Home,
    },
    {
        path: "/user",
        component: User,
        // routes: [
        //     {
        //         path: '/communication/:id',
        //         component: Course
        //     }
        // ]
    },
]
 
export default routes