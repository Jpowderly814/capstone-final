import "bootstrap/dist/css/bootstrap.min.css";
import Connect from "./Connect";
import Dashboard from "./Dashboard";

const code = new URLSearchParams(window.location.search).get("code");

function A() {
  return code ? <Dashboard code={code} /> : <Connect />
};

export default A;
