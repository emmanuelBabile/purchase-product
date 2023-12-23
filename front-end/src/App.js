import { Col, Container, Row, Button, Card, Nav } from "react-bootstrap";
import Product from "./components/Product";
import Purchase from "./components/Purchase";
import { useState } from "react"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  const [showAchat, setShowAchat] = useState(false);
  const handleShowAchat = () => {
    setShowAchat(true); // Mettez à jour l'état pour afficher Achat
  };

  return (
    <Router>
      <Container>
        
          <Card>
            <Card.Header>
              <Nav variant="pills" defaultActiveKey="#first">
                <Nav.Item>
                  <Nav.Link href="/" style={{ fontSize: '1.5em' }}>Products</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/purchase" style={{ fontSize: '1.5em' }}>Purchase</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Routes>
                <Route path="/" element={<Product />} />
                <Route path="/purchase" element={<Purchase />} />
              </Routes>
          </Card.Body>
        </Card>
      </Container>
    </Router>
    

  );
}

export default App;
