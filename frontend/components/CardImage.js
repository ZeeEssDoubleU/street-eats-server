import React, { useState, useRef } from "react";
import useLayoutEffect from "../utils/useIsomorphicLayoutEffect";
import PropTypes from "prop-types";
import styled from "styled-components";
// import components
import { CardMedia } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import LazyLoad from "react-lazyload";

const CardImage = (props) => {
	const [image_loaded, setImageLoaded] = useState(false);
	const [imageUrl, setImageUrl] = useState();
	const imageContainerRef = useRef();

	useLayoutEffect(() => {
		const imageContainer = imageContainerRef.current;
		const imageContainerWidth = imageContainer.offsetWidth;
		const imageContainerWidth_125x = imageContainerWidth * 1.25;

		// full image quality determined by container dimensions above
		setImageUrl(
			`${process.env.NEXT_PUBLIC_CLOUDINARY_URL_PREFIX}/w_${imageContainerWidth_125x},dpr_auto,q_auto/${props.image.hash}${props.image.ext}`,
		);
	}, []);

	return (
		<Container ref={imageContainerRef}>
			<LazyLoad
				once
				offset={500}
				// placeholder displays until lazy load complete
				placeholder={<StyledSkeleton variant="rect" animation="wave" />}
			>
				{/* low quality image */}
				<ProgressiveImage_Overlay
					component="img"
					src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL_PREFIX}/dpr_auto,q_25,e_vectorize/${props.image.formats.thumbnail.hash}${props.image.ext}`}
					image_loaded={image_loaded === true ? "true" : "false"}
				/>
			</LazyLoad>
			{/* higher quality image lazyloads closer to view port than low quality image.  Prevents excessive bandwidth */}
			<LazyLoad once offset={100}>
				{/* high quality image */}
				<ProgressiveImage
					// card media set to 'img' so onload prop works without having to create duplicate Image() to check if loaded
					component="img"
					src={imageUrl}
					onLoad={() => {
						// only setImageLoaded to true if component loads with image url
						if (imageUrl !== "undefined") {
							setImageLoaded(true);
						}
					}}
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
	opacity: ${(props) => (props.image_loaded === 'true' ? 0 : 1)};
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
