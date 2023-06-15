import React from "react";
import { Popover,  Overlay } from "react-bootstrap";

const PopOver = ({ ref, show, target }) => {
	return (
		<Overlay
			show={show}
			target={target}
			placement="bottom"
			container={ref}
			containerPadding={20}
		>
			<Popover id="popover-contained">
				<Popover.Header as="h3">알림</Popover.Header>
				<Popover.Body>
					
				</Popover.Body>
			</Popover>
		</Overlay>
	);
};

export default PopOver;
