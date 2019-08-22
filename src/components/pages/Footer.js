import React from 'react'

class Footer extends React.Component {
  render(){
    return(
      <footer>
        <div className="footer-bottom">
          <div className="row">
            <div className="span">
              <p className="copyright"> © 2019. All rights reserved </p>
              <ul id="menu-footer-menu">
                <li id="menu-item"> Privacy Policy </li>
                <li id="menu-item"> Cookie Policy </li>
                <li id="menu-item"> Terms and Conditions </li>
                <p className="copyright"> This website uses cookies. By using this website, you agree we can set and use cookies </p>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
export default Footer
