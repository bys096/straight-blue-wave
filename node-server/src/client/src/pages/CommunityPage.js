import React, { useEffect, useState } from "react";
import Footer from "../components/views/Footer";
import Header from "../components/views/Header";
import axios from "axios";

const CommunityPage = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8080/posts")
			.then((response) => {
				setPosts(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<div>
			<Header></Header>
			<h1>커뮤니티입니다</h1>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						{post.title} {post.content} {post.writer}
					</li>
				))}
			</ul>
			<Footer></Footer>
		</div>
	);
};

export default CommunityPage;
