import {
  useLoaderData,
  useActionData,
  useNavigation,
  Form,
} from "react-router-dom";

const LoginPage = () => {
  const message = useLoaderData() as string;
  const action_data = useActionData() as { message: string };
  const navigation = useNavigation();

  return (
    <div>
      {navigation.state === "submitting" ? (
        <h4>Formularz jest przetwarzany</h4>
      ) : null}
      {message && <h2 style={{ color: "red" }}>{message}</h2>}
      {action_data && action_data.message}
      <Form method="post" replace>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button>Login</button>
      </Form>
    </div>
  );
};

export default LoginPage;
