import { useEffect, useState } from "react";
import { Form } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface LoginFormValues {
  username: string;
  password: string;
}

export default function useLoginPageHook() {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      console.log("User already logged in, redirecting to home page.");

      navigate("/");
    }
  }, [navigate]);
  const [form] = Form.useForm<LoginFormValues>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await axios.post(`${apiUrl}/auth/login`, {
        username: values.username,
        password: values.password,
      });

      localStorage.setItem("accessToken", response.data.user.id);
      navigate("/");
    } catch (error: unknown) {
      console.error("Login Error:", error);

      const serverMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Thông tin đăng nhập không chính xác!";

      form.setFields([
        {
          name: "username",
          errors: [" "],
        },
        {
          name: "password",
          errors: [serverMessage],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    handleSubmit,
  };
}
