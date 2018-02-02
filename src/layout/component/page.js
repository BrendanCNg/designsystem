import React, { Fragment } from 'react';
import Navigation from './../navigation';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';
import Path from 'path';
import Fs from 'fs';


/**
 * The page component for components
 */
const ComponentPage = ({
	_ID,
	_relativeURL,
	_parseYaml,
	_pages,
	_isDocs,
	header,
	headernav,
	sidebar,
	pagetitle,
	main,
	footer
}) => {

	const headContent = `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<meta http-equiv="x-ua-compatible" content="ie=edge">

<title>${ pagetitle }</title>

<link rel="shortcut icon" type="image/x-icon" href=${ _relativeURL( '/assets/img/favicon.ico', _ID ) }>
<link rel="stylesheet" href=${ _relativeURL( '/assets/css/style.css', _ID ) }>

<!--[if lte IE 9]>
	<script src="${ _relativeURL( '/assets/js/html5shiv.js', _ID ) }"></script>
	<script src="${ _relativeURL( '/assets/js/respond.js', _ID ) }"></script>
<![endif]-->
<script src=${ _relativeURL( '/assets/js/header.js', _ID ) }></script>`;

	const tabs = _parseYaml( Fs.readFileSync( Path.normalize(`${ __dirname }/../../../content/components/tabs.yml`), 'utf8' ) );

	return (
		<html>
		<head dangerouslySetInnerHTML={{ __html: headContent }} />

		<body className="au-grid is-components">

			{ header }
			<div className="page-wrapper">
				<div className="content-wrapper">
					<main id="content" className="main au-body container-fluid">
						<div className="row content-matchheight">
							<div className="col-md-3 sidebar">
								{ sidebar }
							</div>
							<div className="col-md-9 content">
								{
									headernav !== false &&
										<Fragment>
											<Header _relativeURL={ _relativeURL } _parseYaml={ _parseYaml } _pages={ _pages } _ID={ _ID } _isDocs={ _isDocs } />
											<Navigation navigation={ tabs.navigation } _relativeURL={ _relativeURL } _ID={ _ID } _pages={ _pages } />
										</Fragment>
								}
								{ main }
								{
									headernav !== false &&
										<Footer _ID={ _ID } _parseYaml={ _parseYaml } _relativeURL={ _relativeURL } _pages={ _pages } />
								}
							</div>
						</div>
					</main>
				</div>

				{ footer }
			</div>
			<script src={ _relativeURL( '/assets/js/footer.js', _ID ) } />
			<script src={ _relativeURL( '/assets/js/prism.js', _ID ) } />
		</body>
		</html>
	);
}

ComponentPage.propTypes = {
	/**
	 * pagetitle: Homepage
	 */
	pagetitle: PropTypes.string.isRequired,

	/**
	 * header: (partials)(2)
	 */
	header: PropTypes.node.isRequired,

	/**
	 * main: (partials)(4)
	 */
	main: PropTypes.node.isRequired,

	/**
	 * footer: (partials)(2)
	 */
	footer: PropTypes.node.isRequired,
};

ComponentPage.defaultProps = {};

export default ComponentPage;
