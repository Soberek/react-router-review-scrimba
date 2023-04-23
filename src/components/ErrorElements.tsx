import { useRouteError } from "react-router-dom";

const ErrorElements = () => {
  const error = useRouteError();
  console.log(error);
  return <pre>Message: {error.message}</pre>;
};

export default ErrorElements;
