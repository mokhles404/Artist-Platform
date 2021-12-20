import React from 'react'

function Topnav() {
    return (
        <section className="page_topline ds table_section table_section_md">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-4 col-sm-6 text-center text-md-left">
							<div className="inline-content medium">
								<p> <i className="fa fa-phone highlight rightpadding_5" aria-hidden="true"></i> 1-888-123-4567 </p>
								<p className="greylinks"> <i className="fa fa-envelope highlight rightpadding_5" aria-hidden="true"></i> <a href="mailto:dj_bishop@example.com">dj_bishop@example.com</a> </p>
							</div>
						</div>
						<div className="col-md-4 col-sm-6 text-center text-md-center widget"> <a className="social-icon socicon-facebook" href="#about" title="Facebook"></a> <a className="social-icon socicon-twitter" href="#" title="Twitter"></a> <a className="social-icon socicon-google" href="#" title="Twitter"></a> <a className="social-icon socicon-linkedin"
							    href="#" title="Twitter"></a> <a className="social-icon socicon-youtube" href="#" title="Youtube"></a> </div>
						<div className="col-md-4 col-sm-12 text-center text-md-right">
							<div className="widget widget_search">
								<form method="get" className="searchform" action="./">
									<div className="form-group margin_0"> <label className="sr-only" for="widget-search-topline">Search for:</label> <input id="widget-search-topline" type="text" value="" name="search" className="form-control" placeholder="Search Keyword"/> </div> <button type="submit" className="theme_button no_bg_button color1">Search</button>									</form>
							</div>
						</div>
					</div>
				</div>
			</section>
    )
}

export default Topnav
