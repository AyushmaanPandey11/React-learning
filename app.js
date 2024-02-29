import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import Contact from "./src/components/Contact";
import  Error  from "./src/components/Error";
import RestaurantMenu from "./src/components/RestaurantMenu"
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom"; 
import { lazy,Suspense } from "react";
import Shimmer from "./src/components/Shimmer";
import UserContext from "./src/utils/UserContext";
import appStore from "./src/utils/appStore";
import { Provider } from "react-redux";
const Grocery = lazy( () => import("./src/components/Grocery") );
const Body = lazy( () => import("./src/components/Body") );
const About = lazy( () => import("./src/components/About") );
//const RestaurantMenu = lazy( () => import("./src/components/RestaurantMenu") );
const Cart = lazy(()=>import("./src/components/Cart"));
// main div tag 
const AppLayout = () =>
{
    const [userName,setUserName]=useState();
    useEffect(() => {
        const data = {
            name: "Pandey"
        };
        setUserName(data.name);
    },[]);
    return (
        <Provider store={appStore} >
        <UserContext.Provider value={ {LoggedInUser : userName, setUserName} } >
        <div className="app">
            <Header/>
            <Outlet />
        </div>
        </UserContext.Provider>
        </Provider>
    );
};
const AppRouter = createBrowserRouter( [
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            {
                path: "/" ,
                element: <Body />,
                errorElement: <Error />,
            },
            {
                path: "/Home" ,
                element: <Suspense fallback={<Shimmer/>}><Body /></Suspense>,
            },
            {
                path: "/AboutUs",
                element: <Suspense fallback={<Shimmer/>}> <About /> </Suspense>,
                errorElement: <Error />,
            },
            {
                path: "/contact",
                element: <Contact />,
                errorElement: <Error />,
            },
            {
                path: "/grocery",
                element : <Suspense fallback={<Shimmer/>}><Grocery /></Suspense>
            },
            {
                path: "/restaurants/:resId",
                element : <RestaurantMenu />
            },
            {
                path: "/cart",
                element : <Suspense fallback={<Shimmer/>} ><Cart /></Suspense>
            },
        ],
        errorElement: <Error />,
    },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={AppRouter} />);
