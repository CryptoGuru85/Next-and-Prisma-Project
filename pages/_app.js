import React from "react";
import { Provider } from "react-redux";
import { useStore } from "~/redux/store";
import { appWithTranslation } from "next-i18next";

import Header from "~/components/Header";
import Footer from "~/components/Footer";


import "~/styles/global.scss";
import "~/styles/theme/theme.scss";

const App = (props) => {
    const { Component, pageProps } = props;
    const store = useStore(pageProps.initialReduxState);

    return (
        <Provider store={store}>
            <Header />
            <div style={{display: "flex", flexDirection: "row"}}>
                <div className="left-bar">
                    <h1>Double Bubble</h1>
                </div>
                <Component {...pageProps} />
            </div>
            <Footer />
        </Provider>
    );
};

export default appWithTranslation(App);