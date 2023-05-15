import React, { useState } from "react";

import { Grid, Typography, Button, Box } from "@mui/material";
import SignUp from "./SignUp";

import backgroundImage from "../assets/img/pexels-tom-fisk-2606532.jpg";

const HeroPage = () => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				sx={{
					height: "100vh",
					width: "100vw",
					backgroundImage: `url(${backgroundImage})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			>
				<Grid item xs={12} md={6}>
					<Typography
						variant="h2"
						component="h1"
						align="center"
						color="white"
						sx={{
							font: "bold",
						}}
						gutterBottom
					>
						Welcome to EmploApp
					</Typography>
					<Typography
						variant="h5"
						component="h2"
						align="center"
						color="white"
						sx={{
							font: "bold",
						}}
						gutterBottom
					>
						Store, update, and share your Employees details securely with
						EmploApp.
					</Typography>
					<Box textAlign="center">
						<Button
							variant="contained"
							color="primary"
							align="center"
							size="large"
							sx={{ mt: 3 }}
							onClick={handleClickOpen}
						>
							<Typography component="h1">Sign up for free</Typography>
						</Button>
					</Box>
				</Grid>
			</Grid>
			<SignUp open={open} handleClose={handleClose} />
		</>
	);
};

export default HeroPage;
