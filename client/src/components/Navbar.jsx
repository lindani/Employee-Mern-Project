import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Toolbar,
	Typography,
	Badge,
	Tooltip,
	Avatar,
} from "@mui/material";
import { Mail, Notifications, Lock, Menu } from "@mui/icons-material";
import AuthForm from "./AuthForm";
import UserMenu from "./UserMenu";

const Navbar = () => {
	const [anchorUserMenu, setAnchorUserMenu] = useState(null);
	const [open, setOpen] = useState(false);

	const { payload: user } = useSelector((state) => state.auth);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<AppBar>
			<Container maxWidth="lg">
				<Toolbar disableGutters>
					<Box sx={{ mr: 1 }}>
						<IconButton size="large" color="inherit">
							<Menu />
						</IconButton>
					</Box>
					<Typography
						variant="h6"
						component="h1"
						noWrap
						sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
					>
						EmploApp
					</Typography>
					<Typography
						variant="h6"
						component="h1"
						noWrap
						sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
					>
						EA
					</Typography>
					{!user ? (
						<div>
							<Button
								size="large"
								color="inherit"
								startIcon={<Lock />}
								onClick={handleClickOpen}
							>
								Login
							</Button>
							<AuthForm
								open={open}
								handleClose={handleClose}
								authType="signin"
							/>
						</div>
					) : (
						<Box>
							<IconButton size="large" color="inherit">
								<Badge color="error" badgeContent={5}>
									<Mail />
								</Badge>
							</IconButton>
							<IconButton size="large" color="inherit">
								<Badge color="error" badgeContent={20}>
									<Notifications />
								</Badge>
							</IconButton>
							<Tooltip title="Open User Settings">
								<IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
									<Avatar src={user?.profileImage} alt={user?.name}>
										{user?.name?.charAt(0).toUpperCase()}
									</Avatar>
								</IconButton>
							</Tooltip>
							<UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} />
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
