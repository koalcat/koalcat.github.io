import React from "react";
import info from "./discription.json";
import styles from "./index.less";

const icon = require("./Icon-App-76x76@2x.png");

interface AppProps {}

const App: React.FC<AppProps> = (props: AppProps) => {
  return (
    <div>
      <img src={icon} alt="logo" className={styles.logo} />
      <h1>{info.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: info.description }} />
    </div>
  );
};

export default App;
