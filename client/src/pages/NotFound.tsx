import React from "react";
import { Button, Result } from 'antd';
import { useHistory } from "react-router";

function NotFound() {
  const history = useHistory();

  const goBack = () => history.push('/');

  return (
    <div className="center h-v">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={goBack}>Back Home</Button>}
      />
    </div>
  )
}

export default NotFound;