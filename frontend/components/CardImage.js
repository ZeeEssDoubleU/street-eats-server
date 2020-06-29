import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import components
import { CardMedia } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import LazyLoad from "react-lazyload";

const CardImage = (props) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const cardMediaRef = useRef();

	return (
		<Container
			ref={cardMediaRef}
			placeholder={<StyledSkeleton variant="rect" animation="wave" />}
		>
			<LazyLoad once offset={500}>
				<ProgressiveImage_Overlay
					component="img"
					src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL_PREFIX}/dpr_auto,q_auto,e_vectorize/${props.image.formats.thumbnail.hash}${props.image.ext}`}
					imageLoaded={imageLoaded}
				/>
			</LazyLoad>
			<LazyLoad once offset={100}>
				<ProgressiveImage
					component="img"
					src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL_PREFIX}/w_1000,dpr_auto,q_auto/${props.image.hash}${props.image.ext}`}
					onLoad={() => setImageLoaded(true)}
				/>
			</LazyLoad>
		</Container>
	);
};

CardImage.propTypes = {};

export default CardImage;

const Container = styled.div`
	position: relative;
	height: 15rem;
	overflow: hidden;
`;
const StyledSkeleton = styled(Skeleton)`
	position: absolute;
	z-index: ${(props) => props.theme.card.zIndex};
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;
const ProgressiveImage_Overlay = styled(CardMedia)`
	position: absolute;
	z-index: ${(props) => props.theme.card.zIndex + 1};
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	filter: blur(4px);
	opacity: ${(props) => (props.imageLoaded === true ? 0 : 1)};
	transition: opacity 1s;
`;
const ProgressiveImage = styled(CardMedia)`
	position: absolute;
	z-index: ${(props) => props.theme.card.zIndex};
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;
