import React from 'react'
import AboutCard from '../common/AboutCard'


const About = () => {
  return(
    <section className="section">
      <div className="container">
        <div className="box">
          <div className="content">
            <h2 className="title is-3 has-white-text">About the Site</h2>
            <p>This site has been developed by Sian Alcock, Ejike Chiboka, Prash Mohan and Freddie Hoy as part of a learning module in General Assembly&lsquo;s Software Engineering Immersive Course using JavaScript and React. </p>
          </div>
        </div>
        <div className="box">
          <div className="content">
            <h2>About Developers</h2>
            <div className="columns is-multiline">
              <div className="column is-one-quarter-desktop is-offset-one-half">
                <AboutCard
                  name="Sian Alcock"
                  image={'https://i.imgur.com/wusyZOE.jpg'}
                  link="https://github.com/sian-alcock"
                />
              </div>
              <div className="column is-one-quarter-desktop is-offset-one-half">
                <AboutCard
                  name="Ejike Chiboka"
                  image={'https://i.imgur.com/owdRqwP.jpg'}
                  link="https://github.com/sian-alcock"
                />
              </div>
              <div className="column is-one-quarter-desktop is-offset-one-half">
                <AboutCard
                  name="Prash Mohan"
                  image={'https://i.imgur.com/vlFtdWv.jpg'}
                  link="https://github.com/sian-alcock"
                />
              </div>
              <div className="column is-one-quarter-desktop is-offset-one-half">
                <AboutCard
                  name="Freddie Hoy"
                  image={'https://i.imgur.com/mObm02y.jpg'}
                  link="https://github.com/sian-alcock"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
