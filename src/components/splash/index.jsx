import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  backgroundGradient,
  mainLayout,
  centerStack,
  buttonContainer,
  actionButton,
  descriptionContainer,
  descriptionHeader,
  iconContainer,
  iconSingle,
  iconBackground,
  fontAwesome,
  iconDescription,
} from './style';

class SplashView extends Component {

  render() {
    return (

      <main style={mainLayout}>

        {/* Large gradient background */}
        <section style={backgroundGradient}></section>

        <section style={centerStack}>

          {/* Call to action */}
          <article style={buttonContainer}>
            <button style={actionButton}>
              GET STARTED TODAY
            </button>
          </article>

          {/* Description card */}
          <article style={descriptionContainer}>

            <h3 style={descriptionHeader}>
              A minimalist group messenger.
            </h3>

            {/* List of description icons */}
            <section style={iconContainer}>

              <div style={iconSingle}>
                <div style={iconBackground}>
                  <FontAwesomeIcon
                    icon='check-circle'
                    style={fontAwesome} />
                </div>
                <div style={iconDescription}>simple</div>
              </div>

              <div style={iconSingle}>
                <div style={iconBackground}>
                  <FontAwesomeIcon
                    icon='lock'
                    style={fontAwesome} />
                </div>
                <div style={iconDescription}>secure</div>
              </div>

              <div style={iconSingle}>
                <div style={iconBackground}>
                  <FontAwesomeIcon
                    icon='signal'
                    style={fontAwesome} />
                </div>
                <div style={iconDescription}>scalable</div>
              </div>
            </section>

          </article>
        </section>
      </main>
    );
  }
}

export default SplashView;
