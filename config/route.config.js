export default [
    { 
        path: '/', 
        component: '@/layout/BasicLayout',
        routes:[
            {
                path:"/factory",
                component: '@/pages/index',
            },
            {
                path:"/service",
                component: '@/pages/indexs',
            },
            {
                path:"/center",
                component: '@/pages/indexs',
            }
        ]
    
    
    },


]