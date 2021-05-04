import React from "react"
import Head from "next/head"
// import metadata
import site_metadata from "../../site_metadata"

// ***********
// component
// ***********

export default function SEO(props) {
	return (
		<Head>
			<html lang={site_metadata.lang} />
			{/* manifest */}
			<link rel="manifest" href="/manifest.json" />
			{/* google site ownership verification
					<meta
               name="google-site-verification"
               content="XEZHILEk_i7LvZufBFhG3Qskxmyq73hQ_-1TmLHjzkw"
            /> */}
			{/* serp */}
			<title>
				{site_metadata.title} | {props.title || site_metadata.title_suffix}
			</title>
			<meta
				name="description"
				content={props.description || site_metadata.description}
			/>
			{/* <meta name="image" content={site_metadata.image} /> */}
			<meta name="theme-color" content={site_metadata.theme_primary} />
			<meta name="keywords" content={site_metadata.keywords} />
			{/* facebook */}
			<meta property="og:url" content={site_metadata.site_url} />
			<meta property="og:title" content={site_metadata.title} />
			<meta property="og:description" content={site_metadata.description} />
			{/* <meta property="og:image" content={site_metadata.image} /> */}
			{/* twitter */}
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:title" content={site_metadata.title} />
			<meta name="twitter:description" content={site_metadata.description} />
			{/* <meta name="twitter:image" content={site_metadata.image} /> */}
		</Head>
	)
}
