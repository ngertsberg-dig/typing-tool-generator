import React from 'react';

import './styles.sass';

export default props => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xlinkHref="http://www.w3.org/1999/xlink"
		width="124"
		height="113"
		viewBox="0 0 124 113"
		className="search-icon"
		onClick={props.onClick}
	>
		<defs>
			<clipPath id="search-cp">
				<rect width="124" height="113" />
			</clipPath>
		</defs>
		<g id="a" clipPath="url(#search-cp)">
			<g transform="translate(20.001 13.001)">
				<path
					d="M84.63,84.558l-24.5-25.485A34.66,34.66,0,1,0,57.688,61.3L82.252,86.843a1.649,1.649,0,1,0,2.378-2.286ZM35.615,65.967A31.334,31.334,0,1,1,66.95,34.632,31.369,31.369,0,0,1,35.615,65.967Z"
					transform="translate(-0.983)"
					fill="#8d8d8d"
				/>
			</g>
		</g>
	</svg>
);
