import styled from "styled-components";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { useSelector } from "react-redux";

const Container = styled.div`
	display: flex;
`;

const Main = styled.div`
	flex: 7;
	background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
	padding: 22px 96px;
`;

function App() {
	const { payload } = useSelector((state) => state.auth);

	return (
		<Container>
			<BrowserRouter>
				<Main>
					<Navbar />
					<Wrapper>
						<Routes>
							<Route path="/" element={payload ? <Home /> : <SignIn />} />
						</Routes>
					</Wrapper>
				</Main>
			</BrowserRouter>
		</Container>
	);
}

export default App;
