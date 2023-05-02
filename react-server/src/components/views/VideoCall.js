import { Container } from "react-bootstrap";
import React, { useRef, useState } from "react";
import io from "socket.io-client";

function VideoCall() {
	const socket = io("http://localhost:4000");
	const myFaceRef = useRef(null);
	const muteRef = useRef(null);
	const cameraRef = useRef(null);
	const camerasRef = useRef(null);
	const callRef = useRef(null);
	const welcomeRef = useRef(null);
	const welcomeFormRef = useRef(null);
	const peerFaceRef = useRef(null);
	const [hidden, setHidden] = useState(true);
	const [welHidden, setWelHidden] = useState(false);

	let myStream;
	let muted = false;
	let cameraOff = false;
	let roomName;
	let myPeerConnection;
	let myDataChannel;

	async function getCameras() {
		try {
			const devices = await navigator.mediaDevices.enumerateDevices();
			const cameras = devices.filter((device) => device.kind === "videoinput");
			const currentCamera = myStream.getVideoTracks()[0];
			cameras.forEach((camera) => {
				const option = document.createElement("option");
				option.value = camera.deviceId;
				option.innerText = camera.label;
				if (currentCamera.label === camera.label) {
					option.selected = true;
				}
				camerasRef.current.appendChild(option);
			});
		} catch (e) {
			console.log(e);
		}
	}

	async function getMedia(deviceId) {
		const initialConstrains = {
			audio: true,
			video: { facingMode: "user" },
		};
		const cameraConstraints = {
			audio: true,
			video: { deviceId: { exact: deviceId } },
		};
		try {
			myStream = await navigator.mediaDevices.getUserMedia(
				// deviceId가 있다면 특정 camera로, 없다면 셀프 카메라로 설정
				deviceId ? cameraConstraints : initialConstrains
			);
			myFaceRef.current.srcObject = myStream;
			if (!deviceId) {
				await getCameras();
			}
		} catch (e) {
			console.log(e);
		}
	}

	function handleMuteClick() {
		myStream
			.getAudioTracks()
			.forEach((track) => (track.enabled = !track.enabled));
		if (!muted) {
			muteRef.class.innerText = "Unmute";
			muted = true;
		} else {
			muteRef.class.innerText = "Mute";
			muted = false;
		}
	}
	function handleCameraClick() {
		myStream
			.getVideoTracks()
			.forEach((track) => (track.enabled = !track.enabled));
		if (cameraOff) {
			cameraRef.current.innerText = "Turn Camera Off";
			cameraOff = false;
		} else {
			cameraRef.current.innerText = "Turn Camera On";
			cameraOff = true;
		}
	}

	async function handleCameraChange() {
		// select 한 camera id를 기준으로 다시 getMedia를 통해 미디어 스트림을 가져옴
		await getMedia(camerasRef.current.value);
		if (myPeerConnection) {
			const videoTrack = myStream.getVideoTracks()[0];
			const videoSender = myPeerConnection
				.getSenders()
				.find((sender) => sender.track.kind === "video");
			videoSender.replaceTrack(videoTrack);
		}
	}

	async function initCall() {
		setWelHidden(true);
		setHidden(false);
		await getMedia();
		makeConnection();
	}

	async function handleWelcomeSubmit(event) {
		event.preventDefault();
		const input = welcomeFormRef.current.querySelector("input");
		await initCall();
		socket.emit("join_room", input.value);
		roomName = input.value;
		input.value = "";
	}

	socket.on("welcome", async () => {
		myDataChannel = myPeerConnection.createDataChannel("chat");
		myDataChannel.addEventListener("message", (event) =>
			console.log(event.data)
		);
		console.log("made data channel");
		const offer = await myPeerConnection.createOffer();
		myPeerConnection.setLocalDescription(offer);
		console.log("sent the offer");
		socket.emit("offer", offer, roomName);
	});

	socket.on("offer", async (offer) => {
		myPeerConnection.addEventListener("datachannel", (event) => {
			myDataChannel = event.channel;
			myDataChannel.addEventListener("message", (event) =>
				console.log(event.data)
			);
		});
		console.log("received the offer");
		myPeerConnection.setRemoteDescription(offer);
		const answer = await myPeerConnection.createAnswer();
		myPeerConnection.setLocalDescription(answer);
		socket.emit("answer", answer, roomName);
		console.log("sent the answer");
	});

	socket.on("answer", (answer) => {
		console.log("received the answer");
		myPeerConnection.setRemoteDescription(answer);
	});

	socket.on("ice", (ice) => {
		console.log("received candidate");
		myPeerConnection.addIceCandidate(ice);
	});

	// RTC Code

	function makeConnection() {
		myPeerConnection = new RTCPeerConnection({
			iceServers: [
				{
					urls: [
						"stun:stun.l.google.com:19302",
						"stun:stun1.l.google.com:19302",
						"stun:stun2.l.google.com:19302",
						"stun:stun3.l.google.com:19302",
						"stun:stun4.l.google.com:19302",
					],
				},
			],
		});
		myPeerConnection.addEventListener("icecandidate", handleIce);
		myPeerConnection.addEventListener("track", handleTrack); // 이 부분이 추가됩니다.
		myStream
			.getTracks()
			.forEach((track) => myPeerConnection.addTrack(track, myStream));
	}

	function handleIce(data) {
		console.log("sent candidate");
		socket.emit("ice", data.candidate, roomName);
	}
	// function handleAddStream(data) {
	//   if (peerFaceRef.current) {
	//     peerFaceRef.current.srcObject = data.stream;
	//   } else {
	//     console.log('peerFaceRef.current is not defined');
	//   }
	// }
	function handleTrack(event) {
		if (peerFaceRef.current) {
			peerFaceRef.current.srcObject = event.streams[0];
		} else {
			console.log("peerFaceRef.current is not defined");
		}
	}

	return (
		<Container>
			<h1>영상통화</h1>
			<div className="video">
				<div>
					<div
						id="welcome"
						ref={welcomeRef}
						style={{ display: welHidden ? "none" : "block" }}
					>
						<form ref={welcomeFormRef}>
							<input placeholder="room name" required type="text" />
							<button onClick={handleWelcomeSubmit}>Enter room</button>
						</form>
					</div>
					<div
						id="call"
						ref={callRef}
						style={{ display: hidden ? "none" : "block" }}
					>
						<div id="myStream">
							<video
								id="myFace"
								ref={myFaceRef}
								autoPlay
								playsInline
								width="400"
								height="400"
							></video>
							<button id="mute" ref={muteRef} onClick={handleMuteClick}>
								Mute
							</button>
							<button id="camera" ref={cameraRef} onClick={handleCameraClick}>
								Turn Camera Off
							</button>
							<select
								id="cameras"
								ref={camerasRef}
								onChange={handleCameraChange}
							></select>
							<video
								id="peerFace"
								ref={peerFaceRef}
								autoPlay
								playsInline
								width="400"
								height="400"
							></video>
						</div>
					</div>
					<button onClick={handleWelcomeSubmit}>teset</button>
				</div>
			</div>
		</Container>
	);
}

export default VideoCall;
