import { Col, Toast } from "react-bootstrap";

const CustomToast = (props) => {
  return (
    <Col xs={5}>
      <Toast
        className={props.className}
        onClose={props.onClose}
        show={props.show}
        delay={props.delay}
        autohide
        bg={props.bg}
      >
        <Toast.Header>
          <strong className="me-auto">{props.title}</strong>
        </Toast.Header>
        <Toast.Body>{props.message}</Toast.Body>
      </Toast>
    </Col>
  );
};

export default CustomToast;
