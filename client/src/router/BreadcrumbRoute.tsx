import React from "react";
import { Route } from "react-router-dom";
import Breadcrumb from "@/components/Breadcrumb";

const SiderMenusRoute = () => <Route path="*" component={Breadcrumb} />

export default SiderMenusRoute;