//APP
class App extends React.Component {
  constructor(props) {
    super(props);

    this.transactionNumber = 0;
    this.requestManager = new RequestManager(this);
    this.collectedInfo = {
      user: {
        name: '',
        email: '',
        password: ''
      },

      shipping: {
        address: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          zipCode: 0
        },
        phoneNumber: ''
      },

      payment: {
        cardNumber: '',
        expiration: '',
        cvv: '',
        zipCode: ''
      }
    }

    this.state = {
      stage: 0
    }
  }

  componentDidMount() {
    this.requestManager.getTransactionNumber();
  }

  nextPage() {

    switch(this.state.stage) {
      case 0:
        break;
      case 1:
        this.collectedInfo.user.name = document.getElementById('name').value;
        this.collectedInfo.user.email = document.getElementById('email').value;
        this.collectedInfo.user.password = document.getElementById('password').value;

        this.requestManager.postUserData();
        break;
      case 2:
        this.collectedInfo.shipping.address.line1 = document.getElementById('line1').value;
        this.collectedInfo.shipping.address.line2 = document.getElementById('line2').value;
        this.collectedInfo.shipping.address.city = document.getElementById('city').value;
        this.collectedInfo.shipping.address.state = document.getElementById('state').value;
        this.collectedInfo.shipping.address.zipCode = document.getElementById('zip').value;
        this.collectedInfo.phoneNumber = document.getElementById('phoneNumber').value;

        this.requestManager.postAddressData();
        break;
      case 3:
        this.collectedInfo.payment.cardNumber = document.getElementById('cardNumber').value;
        this.collectedInfo.payment.expiration = document.getElementById('cardNumber').value;
        this.collectedInfo.payment.cvv = document.getElementById('cardNumber').value;
        this.collectedInfo.payment.zipCode = document.getElementById('cardNumber').value;

        this.requestManager.postPaymentData();
        break;
      case 4:
        break;
    }

    if(this.state.stage === 4) {
      this.setState({stage: 0});
      this.requestManager.getTransactionNumber();
    } else {
      this.setState({stage: this.state.stage + 1});
    }
  }

  render() {
    if(this.state.stage === 0) {
      return (
        <div>
          <h2> Your Cart: </h2>
          <button onClick={this.nextPage.bind(this)}> Checkout </button>
        </div>
      )
    } else if(this.state.stage === 1) {
      return (
        <div>
          <Form1 />
          <button onClick={this.nextPage.bind(this)}> Next </button>
        </div>
      );

    } else if (this.state.stage === 2) {
      return (
        <div>
          <Form2 />
          <button onClick={this.nextPage.bind(this)}> Next </button>
        </div>
      );

    } else if (this.state.stage === 3) {
      return (
        <div>
          <Form3 />
          <button onClick={this.nextPage.bind(this)}> Next </button>
        </div>
      );

    } else if (this.state.stage === 4) {
      return (
        <div>
          <div> Would you like to finalize your Purchase? </div>
          <button onClick={this.nextPage.bind(this)}> Purchase </button>
        </div>
      );
    }
  }
}

//FORMS
function Form1(props) {
  return (<form id='userData'>
    <h2>Login!</h2>
    Name: <input id='name' /><br />
    E-mail: <input id='email' /><br />
    Password: <input id='password' type='password'/><br />
  </form>);
};
function Form2(props) {
  return (<form id='shippingData'>
    <h2>Shipping Information</h2>
    Address:<br />
    Line 1: <input id='line1' /><br />
    Line 2: <input id='line2' /><br />
    City: <input id='city' /><br />
    State: <input id='state' /><br />
    Zip Code: <input id='zip' /><br />
    <br />
    Phone Number: <input id='phoneNumber' />
  </form>);
};
function Form3(props) {
  return (<form id='paymentData'>
    <h2>Payment Information</h2>
    Card Number: <input id='cardNumber'/><br />
    Expiration: <input id='expiration' /><br />
    Security Code: <input id='cvv' /><br />
    Billing Zip Code: <input id='billingZip' /><br />
  </form>);
};

//COMPONENTS


//Helper Object
class RequestManager {
  constructor(app) {
    this.app = app;
  }
  getTransactionNumber() {
    $.ajax('/api/transactionNumber', {
      method: 'GET',
      success: (data) => {
        console.log('transaction number is ',data);
        this.app.transactionNumber = data;
      },
      error: (e) => {
        console.warn('transaction number get failed\n', e);
      },
      complete: () => {
        console.log('transaction number get req resolved');
      }
    })
  }
  postUserData() {
    $.ajax('/api/userData', {
      method: 'POST',
      data: {
        transactionNumber: this.app.transactionNumber,
        payload: this.app.collectedInfo.user
      },
      success: () => {
        console.log('successfully posted userdata to record');
      },
      error: (e) => {
        console.warn('error posting userData to server\n', e);
      },
      complete: () => {
        console.log('userdata post resolved');
      }
    })
  }
  postAddressData() {
    $.ajax('/api/addressData', {
      method: 'POST',
      data: {
        transactionNumber: this.app.transactionNumber,
        payload: this.app.collectedInfo.shipping
      },
      success: () => {
        console.log('successfully posted addressdata to record');
      },
      error: (e) => {
        console.warn('error posting addressData to server\n', e);
      },
      complete: () => {
        console.log('addressdata post resolved');
      }
    })
  }
  postPaymentData() {
    $.ajax('/api/billingData', {
      method: 'POST',
      data: {
        transactionNumber: this.app.transactionNumber,
        payload: this.app.collectedInfo.payment
      },
      success: () => {
        console.log('successfully posted billingdata to record');
      },
      error: (e) => {
        console.warn('error posting billingData to server\n', e);
      },
      complete: () => {
        console.log('billingdata post resolved');
      }
    })
  }
}

//START CLIENT
var myApp = <App />

var initializeCheckoutApp = function() {
  ReactDOM.render(myApp, document.getElementById('appframe'), );
}