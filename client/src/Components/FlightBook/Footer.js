import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { DetailLabel } from './detail-label.js';
import { PriceInfo } from './price-info';
import nonStopFlightLogo from './../../assets/nonstop.png';
import { getTimeDifferece } from './../../lib/utils';
import './FlightInfo.css';




export const  Footer = (props) => {

  return (

	<div class = "container" id = "cards">
		<div class="row panel text-center">
		   <div class="col-lg-4 col-md-4 col-sm-6" style="padding:10px">

				<div  class="img-thumbnail img-fluid thumb-div">

					<div id="slideshow">

						{/* <div>
							<img class="card-img-top mySlides1" src="https://imgak.mmtcdn.com/pwa-hlp/assets/img/hlp/deals/ic-flight-16.jpg" style="width:100%"/>
						</div>
						<div>
							<img class="card-img-top mySlides1" src="https://imgak.mmtcdn.com/pwa-hlp/assets/img/hlp/deals/ic-flight-11.jpg" style="width:100%"/>
						</div>
						<div>
							<img class="card-img-top mySlides1" src="https://imgak.mmtcdn.com/pwa-hlp/assets/img/hlp/deals/ic-flight-14.jpg" style="width:100%"/>
						</div> */}

					</div>
					<div class="hello-div">
						<h5 class="card-title">
							Delhi
						</h5>
						<h6 class = "card-title">
							Cheapest flights to Delhi
							 <br/>
							Upto 10% off
						</h6>
					</div>

				</div>

			</div>

			<div class="col-lg-4 col-md-4 col-sm-6" style="padding:10px">

				<div  class="img-thumbnail img-fluid thumb-div">

					<div id="slideshow1">

						<div>
							<img class="card-img-top mySlides1" src="https://imgak.mmtcdn.com/pwa-hlp/assets/img/hlp/deals/ic-flight-11.jpg" style="width:100%"/>
						</div>
						<div>
							<img class="card-img-top mySlides1" src="https://imgak.mmtcdn.com/pwa-hlp/assets/img/hlp/deals/ic-flight-14.jpg" style="width:100%"/>
						</div>
						<div>
							<img class="card-img-top mySlides1" src="https://imgak.mmtcdn.com/pwa-hlp/assets/img/hlp/deals/ic-flight-16.jpg" style="width:100%"/>
						</div>

					</div>

					<div class="hello-div">
						<h5 class="card-title">
							Mumbai
						</h5>
						<h6 class = "card-title">
							Cheapest flights to Mumbai
							<br/>
							Upto 20% off
						</h6>
					</div>
				</div>

			</div>

			<div class="col-lg-4 col-md-4 col-sm-6" style="padding:10px">

				<div  class="img-thumbnail img-fluid thumb-div flip-card">

					<div id="slideshow2">

						<div>
							<img class="card-img-top mySlides1" src="https://imgak.mmtcdn.com/pwa-hlp/assets/img/hlp/deals/ic-flight-14.jpg" style="width:100%"/>
						</div>
						<div>
							<img class="card-img-top mySlides1" src="https://imgak.mmtcdn.com/pwa-hlp/assets/img/hlp/deals/ic-flight-16.jpg" style="width:100%"/>
						</div>
						<div>
							<img class="card-img-top mySlides1" src="https://imgak.mmtcdn.com/pwa-hlp/assets/img/hlp/deals/ic-flight-11.jpg" style="width:100%"/>
						</div>
					</div>

					<div class="hello-div">
						<h5 class="card-title">
							Chennai
						</h5>
						<h6 class = "card-title">
							Cheapest flights to Chennai
							<br/>
							Upto 15% off
						</h6>
					</div>
				</div>

			</div>


		</div>
	</div>

  )
}

export default Footer;