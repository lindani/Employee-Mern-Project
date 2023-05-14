import styled from "styled-components";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HeroPage from "./pages/HeroPage";
import { useSelector } from "react-redux";

const Container = styled.div`
	display: flex;
`;

function App() {
	const { payload } = useSelector((state) => state.auth);

	return (
		<Container>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={payload ? <Home /> : <HeroPage />} />
				</Routes>
			</BrowserRouter>
		</Container>
	);
}

export default App;
