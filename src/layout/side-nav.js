import AUsideNav           from '../_uikit/layout/side-nav';

import React, { Fragment } from 'react';
import PropTypes           from 'prop-types';

const SideNav = ({ order, _relativeURL, _ID, _nav, _pages }) => {

	// const SortNavigation = ( a, b ) => {
	// 	const indexOfA = order.indexOf( a.link );
	// 	const indexOfB = order.indexOf( b.link );

	// 	if ( indexOfA === -1 ){
	// 		indexOfA = order.length + 1;
	// 	}

	// 	if ( indexOfB === -1 ){
	// 		indexOfB = order.length + 1;
	// 	}

	// 	if ( indexOfA < indexOfB ){
	// 		return -1;
	// 	}

	// 	if ( indexOfA > indexOfB ){
	// 		return 1;
	// 	}

	// 	return 0;
	// }

	const CreateNavigation = ( nav ) => Object.entries( nav )
		.map( ([ key, value ]) => {
			const link = {
				text: _pages[ key ].pagetitle,
				link: _relativeURL( key, _ID ),
				active: _ID === key ? true : false,
			}

			// If the element has children create children
			if ( typeof value === 'object' ){
				link.children = CreateNavigation( value );
			}

			return link;
		});

	let navItems = CreateNavigation( _nav.index[ 'get-started' ] );

	// If there is an order, sort the navigation
	// if( order ){
	// 	navItems.sort( SortNavigation );
	// }


	return(
		<AUsideNav
			accordionHeader="More information on getting started"
			menuHeaderLink="/get-started"
			menuHeader="Get started"
			items={ navItems }
		/>
	);
};


SideNav.propTypes = {};

SideNav.defaultProps = {};

export default SideNav;
