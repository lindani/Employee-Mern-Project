import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { Logout, Settings } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { authSignout } from "../redux/actions/userActions";

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
	const dispatch = useDispatch();

	const handleSignOut = () => {
		dispatch(authSignout());
	};

	const handleCloseUserMenu = () => {
		setAnchorUserMenu(null);
	};

	return (
		<Menu
			anchorEl={anchorUserMenu}
			open={Boolean(anchorUserMenu)}
			onClose={handleCloseUserMenu}
			onClick={handleCloseUserMenu}
		>
			<MenuItem>
				<ListItemIcon>
					<Settings fontSize="small" />
				</ListItemIcon>
				Profile
			</MenuItem>
			<MenuItem
				onClick={() => dispatch({ type: "UPDATE_USER", payload: null })}
			>
				<ListItemIcon>
					<Logout fontSize="small" onClick={handleSignOut} />
				</ListItemIcon>
				Logout
			</MenuItem>
		</Menu>
	);
};

export default UserMenu;
