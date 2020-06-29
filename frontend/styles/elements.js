import styled from "styled-components";
// import components
import {
	Container,
	Card,
	CardActionArea,
	CardActions,
	Button,
} from "@material-ui/core";

export const Main = styled(Container)`
	margin: 4rem auto;
	padding: 1rem;
`;
export const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(
		auto-fit,
		${(props) => props.theme.card.width}
	);
	justify-content: center;
	grid-gap: ${(props) => props.theme.spacing(2) + "px"};
`;
export const StyledActionArea = styled(CardActionArea)`
	cursor: default;
`;
export const StyledCardActions = styled(CardActions)`
	display: flex;

	padding: 1rem;
	justify-content: ${(props) => (props.item ? "space-between" : null)};
`;
export const StyledNavButton = styled(Button)`
	height: 4rem;
	padding: 1rem;
	color: white;
`;
