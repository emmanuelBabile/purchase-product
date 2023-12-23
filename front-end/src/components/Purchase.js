import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import apiProduct from '../connexion/axios';

function Purchase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [conversionRate, setConversionRate] = useState(0);

  useEffect(() => {
    apiProduct.get('/products')
      .then(rep => {
        setProducts(rep.data);
      })
      .catch(err => console.error(err));

    const conversionRateFromBackend = 0.85; 
    setConversionRate(conversionRateFromBackend);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };


  const addToCart = (product) => {
    const existingProduct = cart.find(item => item._id === product._id);
    if (existingProduct) {
      updateQuantity(existingProduct._id, existingProduct.quantity + 1);
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1, _id: product._id + '-' + Math.random() }];
      setCart(updatedCart);
    }
  };
  


  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map(item =>
      item._id === productId ? { ...item, quantity: newQuantity >= 0 ? newQuantity : item.quantity } : item
    );
    setCart(updatedCart);
  };

  const decrementQuantity = (productId) => {
    const updatedCart = cart.map(item =>
      item._id === productId ? { ...item, quantity: item.quantity - 1 >= 0 ? item.quantity - 1 : item.quantity } : item
    );
    setCart(updatedCart);
  };

  const incrementQuantity = (productId) => {
    const updatedCart = cart.map(item =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const convertToEuro = (price) => {
    const euroPrice = price * conversionRate;
    return euroPrice.toFixed(2); 
  };

  const calculateTotalInEuro = () => {
    const total = calculateTotal(); 
    const totalEuro = convertToEuro(total);
    return totalEuro; 
  };

  return (
    <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
      <Row className="mb-3">
        <Col className="bg-secondary text-white display-6 font-weight-bold font-italic">
          Make your purchase here
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Search by name or category"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Table responsive hover variant="light">
            <thead>
              <tr>
                <th>Product name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map(p =>
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                  <td>
                    <Button variant='warning' onClick={() => addToCart(p)}>Add to Cart</Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row  className="mb-3">
        <Col>
          <h3 className='text-warning'>Your Cart</h3>
          <Table responsive variant="dark">
          <thead>
              <tr>
                <th>Product name</th>
                <th>Category</th>
                <th>Unit price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(p =>
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                  <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '20px' }}>
                    <Button variant='outline-danger' onClick={() => decrementQuantity(p._id)}>-</Button>
                    <span>{p.quantity}</span>
                    <Button variant='outline-success' onClick={() => incrementQuantity(p._id)}>+</Button>
                  </td>


                  <td>{p.price * p.quantity}</td>
                </tr>
              )}
            </tbody>
          </Table>
          <h4>Total in Euro: {calculateTotalInEuro()} € ({calculateTotal()} MAD)</h4>
        </Col>
      </Row>
    </Container>
  );
}

export default Purchase;
