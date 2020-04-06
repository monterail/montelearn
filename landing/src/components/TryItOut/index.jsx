import Embed from "react-runkit";

const defaultCode = `
  try {
    const response = await fetch(' https://lesson-api-test.herokuapp.com/api/lesson')
    const lessons = await response.json()
  } catch (error) {
    console.error(error)
  }
`;

const TryItOutComponent = ({ code }) => {
  return (
    <div css={{ width: "70%" }}>
      <Embed source={code} preamble={"const fetch = require('node-fetch')"} />
    </div>
  );
};

TryItOutComponent.defaultProps = {
  code: defaultCode,
};

export default TryItOutComponent;
