/* eslint-disable jsx-a11y/alt-text */
import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
import './navbar.css';
import logo from './HUBGRUB.png';

 
// Here, we display our Navbar
export function NavBar() {

	return (
		<div>
      <img className="imglogo" style={{ textAlign: "left", width: "", height: "" }} src={logo} alt="Logo2" />
			<section className="navigation">
				<div className="nav-container">
					<div class="brand">

					</div>
					<nav>
						<div className="nav-mobile"><a id="nav-toggle" href="#!"><span></span></a></div>
						<ul className="nav-list">
							<li>
								<a href={'/#'}>Create Order</a>
							</li>
							<li>
								<a href="/#">Create Recipe</a>
							</li>
							<li>
								<a href="/#">ingredient Purchase</a>
							</li>
						</ul>
					</nav>
				</div>
			</section>
		</div>
	)
}



export default NavBar;
