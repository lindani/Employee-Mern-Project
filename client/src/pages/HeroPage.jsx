import React from "react";
import { useSelector } from "react-redux";

import { Grid, Typography, Button, Box } from "@mui/material";
import LinearWithValueLabel from "../components/LinearProgressBar";
import Navbar from "../components/Navbar";

import backgroundImage from "../assets/img/pexels-tom-fisk-2606532.jpg";

const HeroSection = () => {
	return (
		<>
			<Navbar />
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
						>
							<Typography component="h1">Sign up for free</Typography>
						</Button>
					</Box>
				</Grid>
			</Grid>
		</>
	);
};

export default HeroSection;
