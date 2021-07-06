import { Result, Button } from "antd";
import { history } from "utils/common";

export default function NotFound404() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => history.push("/")}>
          Back Home
        </Button>
      }
    />
  );
}
