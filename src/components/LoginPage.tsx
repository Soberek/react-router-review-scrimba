import { useLoaderData, Form, redirect } from "react-router-dom";

export async function action({ request }) {
  const form_data = await request.formData();

  const email = form_data.get("email");
  const password = form_data.get("password");

  const login = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): { message: string; token: string } => {
    return new Promise((resolve, reject) => {
      if (email && password) {
        setTimeout(() => {
          resolve({
            message: "logged success",
            token: "mówie sayonara, pora wypierdalać",
          });
        }, 1000);
      }
    });
  };

  const response = await login({ email, password });

  localStorage.setItem("login", JSON.stringify(response));

  return redirect("/");
}

const LoginPage = () => {
  const message = useLoaderData() as string;

  return (
    <div>
      {message && <h2 style={{ color: "red" }}>{message}</h2>}

      <Form method="post">
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button>Login</button>
      </Form>
    </div>
  );
};

export default LoginPage;
