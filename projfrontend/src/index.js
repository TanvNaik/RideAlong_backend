import React from "react";
import ReactDOM from "react-dom";
import Routers from "./Routers"
import "./style.css"
import "leaflet/dist/leaflet.css"
import 'mapbox-gl/dist/mapbox-gl.css';
import bg from "./bg.svg"

ReactDOM.render(<Routers />, document.getElementById("root"));
