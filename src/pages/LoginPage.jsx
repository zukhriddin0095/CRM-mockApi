//

import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

   import "./login.scss";


const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post("https://reqres.in/api/login", values);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      message.error(`Email or password "Hato tog'rlab tering"`);
    }
  };


  return (
    <Fragment>
      <div className="loginPage">
        <Form
          className="loginPage__form"
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please Fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please Fill Password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button
              loading={loading}
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
};

export default LoginPage;
