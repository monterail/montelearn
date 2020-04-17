import Embed from "react-runkit";

const defaultCode = `
const response = await fetch(API_URL + "/api/lesson")
await response.json();
`.trim();

const preable = `
const fetch = require('node-fetch');
const API_URL = "https://lesson-api-test.herokuapp.com";
`;

const TryItOutComponent = ({ code = defaultCode }) => {
  return <Embed source={code} preamble={preable} />;
};

export default TryItOutComponent;
