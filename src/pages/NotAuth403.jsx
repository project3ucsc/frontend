import { Result, Button } from "antd";
// import { history } from "utils/common";

export default function NotAuth403({ history }) {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => history.push("/login")}>
          Click here to login
        </Button>
      }
    />
  );
}
