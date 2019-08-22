import React from 'react'

class Footer extends React.Component {
  render(){
    return(
      <footer>
        <div className="footer-bottom">
          <div className="row">
            <div className="span">
              <div id="footer-social">
                <a target="_blank" rel="noopener noreferrer" href="https://www.losttheplot.com" className="fab fa-3x fa-twitter-square"></a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.losttheplot.com" className="fab fa-3x fa-facebook-square"></a>
              </div>
              <p className="copyright"> © 2019. All rights reserved </p>
              <ul id="menu-footer-menu">
                <li id="menu-item"> Privacy Policy </li>
                <li id="menu-item">Cookie Policy </li>
                <li id="menu-item"> Terms and Conditions </li>
                <li id="menu-item"> Contact us </li>
                <li id="menu-item"> Careers </li>
                <li id="menu-item"> Advertise </li>
                <li id="menu-item"> Events </li>
                <div>
                  <p className="copyright"> This website uses cookies. By using this website, you agree we can set and use cookies </p>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
export default Footer
