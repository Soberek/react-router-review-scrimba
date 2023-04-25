import { redirect } from "react-router-dom";

const mockLogin = ({
  email,
  password,
}: {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}): Promise<{ message: string; token?: string }> => {
  return new Promise((resolve, reject) => {
    if (email && password) {
      setTimeout(() => {
        resolve({
          message: "logged success",
          token: "mówie sayonara, pora wypierdalać",
        });
      }, 1000);
    } else {
      reject({ message: "Login/Password incorrect" });
    }
  });
};

export async function action({ request }: { request: Request }) {
  const form_data = await request.formData();

  const email = form_data.get("email");
  const password = form_data.get("password");

  const redirect_path = new URL(request.url).searchParams.get("redirectTo");

  try {
    const response = await mockLogin({ email, password });
    localStorage.setItem("login", JSON.stringify(response));
    return redirect(`${redirect_path ? redirect_path : "/"}`);
  } catch (err) {
    return err;
  }
}
