import React from "react";
import {Link, NavLink} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
            <div className="offcanvas-md offcanvas-end bg-body-tertiary" id="sidebarMenu"
                 aria-labelledby="sidebarMenuLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu"
                            aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink to={'/'}
                                     style={({ isActive, isPending }) => {
                                         return {
                                             color: isActive ? "#2470dc" : "inherit",
                                         };
                                     }}
                                     className="nav-link d-flex align-items-center gap-2 active"
                                     aria-current="page">
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/users'}
                                     style={({ isActive, isPending }) => {
                                         return {
                                             color: isActive ? "#2470dc" : "inherit",
                                         };
                                     }}
                                     className="nav-link d-flex align-items-center gap-2">
                                <svg className="bi">
                                    {/*<use xlink:href="#file-earmark"></use>*/}
                                </svg>
                                Users
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/roles'}
                                     style={({ isActive, isPending }) => {
                                         return {
                                             color: isActive ? "#2470dc" : "inherit",
                                         };
                                     }}
                                     className="nav-link d-flex align-items-center gap-2">
                                <svg className="bi">
                                </svg>
                                Roles
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/products'}
                                     style={({ isActive, isPending }) => {
                                         return {
                                             color: isActive ? "#2470dc" : "inherit",
                                         };
                                     }}
                                     className="nav-link d-flex align-items-center gap-2">
                                <svg className="bi">
                                </svg>
                                Products
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/orders'}
                                     style={({ isActive, isPending }) => {
                                         return {
                                             color: isActive ? "#2470dc" : "inherit",
                                         };
                                     }}
                                     className="nav-link d-flex align-items-center gap-2">
                                <svg className="bi">
                                </svg>
                                Orders
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Sidebar;