import React from "react";
import {Container} from "react-bootstrap";

function MainPage(props) {
	return (
		<Container>
			<div>
                <h1>메인페이지!!!!</h1>
				<img className="img1" alt="baseImage.jpg" src="img/penguin.jpg" height={500} width={500} />
			</div>
		</Container>
	);
}

export default MainPage;
