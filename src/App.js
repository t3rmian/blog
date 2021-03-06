import "./app.scss";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Head, Root, Routes } from "react-static";
import { Location, Router } from "components/Router";

import Loader from "./components/Loader";
import React from "react";
import config from "./template.config";
import lifecycle from "react-pure-lifecycle";
import { loadTheme } from "components/Theme";
import { globalHistory } from '@reach/router';
import { makeVisible } from "./utils";

const methods = {
  componentDidMount(props) {
    loadTheme();

    if (config.optional.ga) {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      let gtagConfig = {
        'allow_ad_personalization_signals': false,
        'allow_google_signals': false,
        'anonymize_ip': true,
        'page_path': window.location.pathname,
        'send_page_view': true,
      };
      gtag("js", new Date());
      gtag("config", config.optional.ga, gtagConfig);
      globalHistory.listen(({ location }) => {
        gtagConfig.page_path = location.pathname
        gtag('config', config.optional.ga, gtagConfig);
      });
    }

    const throttle = (ms, fun) => {
      let isThrottled;
      return (...args) => {
        if (!isThrottled) {
          fun(...args);
          isThrottled = setTimeout(() => (isThrottled = false), ms);
        }
      };
    };
    const throttleTimeout = 25;
    const fadeObjects = [
      {
        visible: true,
        fadeOutSelector: "header .fadeIn, nav.fadeIn",
        fadeInSelector: "header .fadeOut, nav.fadeOut",
        minOffset: 50
      },
      {
        inverted: true,
        visible: false,
        fadeOutSelector: ".social",
        fadeInSelector: ".social",
        get minOffset() {
          return document.querySelector(".content")?.clientHeight / 2
        }
      }
    ]

    document.addEventListener("scroll", throttle(throttleTimeout, function (scrolledElement) {
      fadeObjects.forEach(fadeObject => {
        const belowOffset = fadeObject.inverted ? !fadeObject.visible : fadeObject.visible;
        if (belowOffset) {
          if (scrolledElement.target.scrollTop > fadeObject.minOffset) {
            fadeObject.visible = !!fadeObject.inverted;
            document.querySelectorAll(fadeObject.fadeOutSelector).forEach(domElement => {
              makeVisible(domElement, fadeObject.visible);
            });
          }
        } else {
          if (scrolledElement.target.scrollTop <= fadeObject.minOffset) {
            fadeObject.visible = !fadeObject.inverted;
            document.querySelectorAll(fadeObject.fadeInSelector).forEach(domElement => {
              makeVisible(domElement, fadeObject.visible);
            });
          }
        }
      })
    }), true);
  }
};

function App() {
  return (
    <Root>
      <Head>
        <meta charSet="UTF-8" />
      </Head>
      <div id="theme" className="theme-light">
        <React.Suspense fallback={Loader()}>
          <Location>
            {({ location }) => {
              return (
                <TransitionGroup className="transition-group">
                  <CSSTransition
                    key={location.pathname}
                    classNames="fade"
                    timeout={500}
                  >
                    <Router location={location} className="router" style={({ outline: undefined })}>
                      <Routes
                        default
                        routePath={decodeURI(location.pathname)}
                      />
                    </Router>
                  </CSSTransition>
                </TransitionGroup>
              );
            }}
          </Location>
        </React.Suspense>
      </div>
    </Root>
  );
}

export default lifecycle(methods)(App);
