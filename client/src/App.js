import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import FormBlog from "./pages/FormBlog";
import DetailBlog from "./pages/DetailBlog";
import Navbar from "./components/Navbar";
import './App.css';

function App() {
	return (
		<div>
			<Navbar />
			<div className="App container-sm my-5 d-flex flex-column align-items-center">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/newBlog" element={<FormBlog />} />
					<Route path="/:blogId" element={<DetailBlog />} />
					<Route path="/editBlog/:blogId" element={<FormBlog />} />
					<Route path="about" element={<About />} />
				</Routes>
			</div>
		</div>
	);
}

function About() {
	return (
		<>
			<main>
				<h2>Who are we?</h2>
				<p>
					That feels like an existential question, don't you
					think?
				</p>
			</main>
			<nav>
				<Link to="/">Home</Link>
			</nav>
		</>
	);
}

export default App;
