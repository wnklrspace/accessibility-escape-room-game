'use client';
import React from 'react';
import { useStep } from "@/store/steps";
import styled from 'styled-components';

const GameScreen: React.FC = () => {
	const { stepId, content } = useStep();

	return (
		<Outer>
			<Left>
				<h1>Moin on page: {content?.title}</h1>
			</Left>
			<Right></Right>
		</Outer>
	);
};

const Outer = styled.div`
	display: flex;
	height: 100%;
`;

const Left = styled.div`
	flex: 0.8;
	background: var(--color-blue-100);
`;

const Right = styled.div`
	flex: 0.2;
	background: var(--color-white);
	// wide box-shadow to the left
	box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
`;

export default GameScreen;