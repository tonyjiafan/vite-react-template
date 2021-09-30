import Home from "@/views/home/Home"
import User from "@/views/user/User"
import VectorEditor from "@/views/vector/Vector"
 
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
    {
        path: "/vector",
        component: VectorEditor,
    },
]
 
export default routes