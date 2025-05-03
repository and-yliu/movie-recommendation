import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./component/Header";

function App() {
    // usestate for setting a javascript
    // object for storing and using data
    const [data, setdata] = useState([]);

    // // Using useEffect for single rendering
    // useEffect(() => {
    //     // Using fetch to fetch the api from 
    //     // flask server it will be redirected to proxy
    //     fetch("/data").then((res) =>
    //         res.json().then((data) => {
    //             // Setting a data from api
    //             setdata(data);
    //         })
    //     );
    // }, []);

    return (
        <>
            <Header/>
        </>
    );
}

export default App;
