import { Form } from "antd";

export interface LoginFormValues {
  username: string;
  password: string;
}

export default function useLoginPageHook() {
  const [form] = Form.useForm<LoginFormValues>();

  const handleSubmit = async (
    values: LoginFormValues
  ) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    form,
    handleSubmit,
  };
}