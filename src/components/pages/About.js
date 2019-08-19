import React from 'react'
import IndexCard from '../heroes/IndexCard'
import ejikeImage from '../../images/ejike.jpg'
import sianImage from '../../images/sian.jpg'
import freddieImage from '../../images/freddie.jpg'
import prashImage from '../../images/prash.jpg'

const About = () => {
  return(
    <section className="section">
      <div className="container">
        <div className="box">
          <div className="content">
            <h2>About the Site</h2>
            <p>This site has been developed by Sian Alcock, Ejike Chiboka, Prash Mohanuon and Freddie Hoy as part of a learning module in General Assembly&lsquo;s Software Engineering Immersive Course using JavaScript, React, Express and Node </p>
          </div>
        </div>
        <div className="box">
          <div className="content">
            <h2>About Developers</h2>
            <div className="columns is-multiline">
              <div className="column is-one-quarter-desktop is-offset-one-quarter">
                <IndexCard
                  name="Sian Alcock"
                  image={sianImage}
                  link="https://github.com/sian-alcock"
                />
              </div>
              <div className="column is-one-quarter-desktop is-offset-one-half">
                <IndexCard
                  name="Ejike Chiboka"
                  image={ejikeImage}
                  link=""
                />
              </div>
              <div className="column is-one-quarter-desktop is-offset-one-half">
                <IndexCard
                  name="Prash Mohanuon"
                  image={prashImage}
                  link=""
                />
              </div>
              <div className="column is-one-quarter-desktop is-offset-one-half">
                <IndexCard
                  name="Freddie Hoy"
                  image={freddieImage}
                  link=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="content">
            <h2>Acknowledgements</h2>
            <p>This site consumes an API published by GitHub user </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
