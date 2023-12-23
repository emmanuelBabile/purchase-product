import React, { useEffect, useState } from 'react'
import { Button,Modal, Form, Table, Row, Col, ButtonGroup, Container } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import apiProduct from '../connexion/axios';

function Product() {
    const [products,setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [showDel, setShowDel] = useState(false);
    const [p,setP] = useState({"id":0, "name":"","category":"","price":0.0});
    const [id,setId] = useState(0);
    const [delId,setDelId] = useState(0);
    const [name,setName] = useState("");
    const [price,setPrice] = useState(0.0);
    const [category,setCategory] = useState("");
  
  const handleClose = () => setShow(false);
  
  const handleUpdate = () =>{
    apiProduct.post("/update/"+id,{
      "name":name,
      "category":category,
      "price":price
    })
    .then((rep)=>{
      console.log(rep.data);
      getProducts()
    })
    .catch((err) =>{
      console.log(err)
    })
    setShow(false);
  }
  const handleShow = (obj)=>{
     setName(obj.name);
     setCategory(obj.category);
     setPrice(obj.price);
     setId(obj.id);
    setShow(true);
  }
  //------------------------------------
  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = (id) => {
    setDelId(id);
    setShowDel(true);
  }

  const deleteProduct = ()=>{
    apiProduct.delete("/delete/"+delId)
    .then((rep)=>{
      console.log(rep.data)
      getProducts()
      setShowDel(false);
    })
    .catch((err)=>console.log(err))
  }
    //------------------------------------------
    const addProduct = (data)=>{
       
        apiProduct.post('/add',data)
        .then(rep =>{
            console.log(rep.data)
            getProducts()
        })
        .catch(err => console.error(err))
       
    }
    //----------------allProduct------------------------
       const getProducts = ()=>{
        apiProduct.get('/products')
        .then(rep=>{
            const sortedProducts = rep.data.sort((a, b)=>{
              return b.id - a.id
            })
            setProducts(rep.data)
            console.log(rep.data)
        })
        .catch(err => console.error(err))
       }
    useEffect(
        ()=>{
         getProducts();
        }
    ,[])

    //---------------------------------------
    const {register, handleSubmit} = useForm()
  return (
    <Container>
      <Row>
        <Col className="bg-secondary text-white display-1 font-weight-bold font-italic">Products management</Col>
      </Row>

    <Row>
        <div>
          <Form onSubmit={handleSubmit(addProduct)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product name</Form.Label>
          <Form.Control {...register("name")} type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Category</Form.Label>
          <Form.Control {...register("category")} type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control {...register("price")} type="text" />
        </Form.Group>

        <Button type='submit' className='btn-success col-6 offset-3'>Add</Button>
      </Form>
      <h2 className='text-primary'>List of products</h2>
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Product name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p =>
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="success" size="sm" onClick={()=>handleShow(p)}>Update</Button> 
                  <Button variant="danger" size="sm" onClick={()=>handleShowDel(p.id)} >Delete</Button>
                </ButtonGroup>
              </td>
            </tr>)
          }
          
          
        </tbody>
      </Table>
      
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update this product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product name</Form.Label>
          <Form.Control value={name} onChange={(e)=>setName(e.target.value)} type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Category</Form.Label>
          <Form.Control value={category} onChange={(e)=>setCategory(e.target.value)}  type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Price</Form.Label>
          <Form.Control value={price} onChange={(e)=>setPrice(e.target.value)}  type="text" />
        </Form.Group>

        
      </Form>
              
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={handleUpdate}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>


        {/* ============Delete ==================== */}
        <Modal show={showDel} onHide={handleCloseDel}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you want to delete this product?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDel}>
              No
            </Button>
            <Button variant="primary" onClick={()=>deleteProduct()}>
            Yes
            </Button>
          </Modal.Footer>
        </Modal>


      </div>
    </Row>


    </Container>
    
  )
}

export default Product