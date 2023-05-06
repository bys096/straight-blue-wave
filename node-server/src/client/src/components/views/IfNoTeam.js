import React from "react";
import ButtonComponent from "../ButtonComponent";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";

const IfNoTeam = () => {
	const NoTeam = styled.div`
		display: flex;
		justify-content: center;
		align-items: center;
        height: 100vh;
        width: 100%;
		background-color: #f5f5f5;
	`;

	const NoTeamForm = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
	`;

    const StyledButtons = styled.div`
		display: flex;
		gap: 1rem; // 버튼 간격 설정
        margin-top : 50px;
	`;

    const history = useNavigate();

    const handleTeamCreate = () => {
        return (
            history("/TeamCreate")
        )
    }

	return (
		<NoTeam>
			<NoTeamForm>
				<div>
					<h3>팀이 없습니다.</h3>
				</div>
				<StyledButtons>
					<ButtonComponent
						name="팀 생성"
						styleClass=""
						onClick={
							handleTeamCreate
						}
						disabled={false}
					/>
					<ButtonComponent
						name="팀 가입"
						styleClass=""
						onClick={
							alert("팀 가입 페이지로 이동")
						}
						disabled={false}
					/>
				</StyledButtons>
			</NoTeamForm>
		</NoTeam>
	);
};

export default IfNoTeam;