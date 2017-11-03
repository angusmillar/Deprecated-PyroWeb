import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-less/semantic.less'

class Testbut extends Component {
    constructor(props) {
        super(props);
        this.state = { counter: 0 };
        this.interval = 1000;
    }

    render() {
        return (
          <Button>Click Here Angus</Button>             
        )
    }
}

Testbut.propTypes = {
    'increment': PropTypes.number.isRequired,
    'color': PropTypes.string.isRequired
}

export default Testbut
