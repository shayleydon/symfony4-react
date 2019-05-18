import React, { Component } from 'react';
import FormContainer from './containers/FormContainer';

class App extends Component {
  render() {
    return (
      <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
            <h3> {this.props.title} </h3>
              <FormContainer country_codes={window.App.country_codes} message_max_length={window.App.message_max_length} />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
