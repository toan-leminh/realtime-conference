import { Container } from "react-bootstrap";
import Header from "./Header";

function PageLayout({ title, description, action, children }) {
  return (
    <div className="container">
        <Header />
        <Container className="d-flex">
            {action}
        </Container>
        <Container className="pb-md-4 mx-auto text-center">
            <h2 className="fw-normal">{title}</h2>
            <p>{description}</p>
        </Container>
        {children}
    </div>
  );
}

export default PageLayout;