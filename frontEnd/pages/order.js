import React from 'react'
import { Container, Row, Button, Col, Form } from 'react-bootstrap'
import fetch from 'isomorphic-unfetch'
import Cookies from 'js-cookie'
import Route from 'next/router'
import CartItem from '../components/CartItem'


export default class ConfirmOrder extends React.Component {
  constructor(props) {
    super(props)

    // this.submitOrder = this.submitOrder.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  state = {
    form: {
      address1: "",
      address2: "",
      postcode: "",
      country: "",
      tel: ""
    }
  }

  createCookies() {
    const cart = [{
      product_id: 1,
      productName: '43 Piece dinner Set',
      productPrice: 12.95,
      productImage: 'https://i.pinimg.com/474x/17/43/2f/17432f12ec88c0d0ea3d0cffc69d25ce.jpg',
      quantity: 1,
    }]
    Cookies.set('cart', JSON.stringify(cart), { expires: 7, path: '' })

    const shipping = {
      shipping_method: 'kerry',
      shipping_address: '405/37 ถ.มหิดล',
      shipping_sub_district: 'ท่าศาลา',
      shipping_district: 'เมือง',
      shipping_province: 'เชียงใหม่',
      shipping_zip_code: '50000',
      recipient_name: 'ณัฐญา ชุติบุตร',
      recipient_phone_number: '0970809292',
    }
    Cookies.set('shipping', JSON.stringify(shipping), { expires: 7, path: '' })
  }


  submitOrder() {
    const cartItems = Cookies.getJSON('cart')
    const cart = cartItems.map(({ product_id, quantity }) => ({ product_id, quantity }))
    const shipping = Cookies.getJSON('shipping')

    fetch('/api/v1/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cart,
        ...shipping,
      }),
    })
      .then((response) => response.json())
      .then((order) => {
        if (order.order_id) {
          Cookies.set('order', JSON.stringify(order), { expires: 7, path: '' })
          Route.push('/Payment')
        }
      })
  }

  handleChange(event) {
    this.setState({ address1: event.target.value });
  }

  submitForm(event) {
    event.preventDefault()
    console.log(this.state)
  }

  render() {
    this.createCookies()
    const productList = Cookies.getJSON('cart')
    return (
      <Container>
        <Row>
          <Col>
            <h4>
              ยืนยันคำสั่งซื้อ
            </h4>
          </Col>
          <hr style={{ width: "100%" }} />
        </Row>
        <Row>
          <Col lg={4}>
            <h4>
              Shipping Address:
            </h4>
          </Col>
          <hr style={{ width: "100%" }} />
        </Row>
        <Form style={{ "width": "100%" }} onSubmit={this.submitForm}>
          <Form.Group as={Row} controlId="formHorizontalAddress1">
            <Form.Label column lg={2}>
              Address1
            </Form.Label>
            <Col lg={6}>
              <Form.Control type="text" value={this.state.address1}
                onChange={e => this.setState({ form: { ...this.state.form, address1: e.target.value } })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalAddress2">
            <Form.Label column lg={2}>
              Address2
              </Form.Label>
            <Col lg={6}>
              <Form.Control type="text" value={this.state.address2} onChange={e => this.setState({ form: { ...this.state.form, address2: e.target.value } })} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPostCode">
            <Form.Label column lg={2}>
              Postcode
            </Form.Label>
            <Col lg={6}>
              <Form.Control type="text" value={this.state.postcode} onChange={e => this.setState({ form: { ...this.state.form, postcode: e.target.value } })} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalCountry">
            <Form.Label column lg={2}>
              Country
            </Form.Label>
            <Col lg={6}>
              <Form.Control type="text" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalTel">
            <Form.Label column lg={2}>
              Tel
            </Form.Label>
            <Col lg={6}>
              <Form.Control type="text" />
            </Col>
          </Form.Group>


          <Form.Group as={Row} controlId="buttonSubmit">
            <Col lg={{ span: 10, offset: 2 }}>
              <Button type="submit">Sign in</Button>
            </Col>
          </Form.Group>
        </Form>
        <Row>
          <Col>รายการชำระเงิน</Col>
          <Col>
            <Row>
              <Col>ค่าสินค้า</Col>
              <Col id="totalProductPrice">12.95 USD</Col>
            </Row>
            <Row>
              <Col>ค่าจัดส่ง</Col>
              <Col id="totalShippingCharge">2.00 USD</Col>
            </Row>
            <Row>
              <Col>รวมทั้งสิ้น</Col>
              <Col id="totalAmount">14.95 USD</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>รายการสินค้า</Col>
        </Row>
        <Row>
          {productList && <CartItem item={productList} />}
        </Row>
        <Row>
          <Col>
            <Button id="editAddress">แก้ไขที่อยู่จัดส่ง</Button>
          </Col>
          <Col>
            <Button id="confirmPayment" onClick={() => this.submitOrder()}>ยืนยันคำสั่งซื้อและชำระเงิน</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}
