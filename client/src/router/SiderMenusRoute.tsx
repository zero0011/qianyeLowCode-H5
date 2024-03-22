import React from "react";
import { Route } from "react-router-dom";
import SiderMenus from "@/components/SiderMenus";

const SiderMenusRoute = () => <Route path="*" component={SiderMenus} />

export default SiderMenusRoute;