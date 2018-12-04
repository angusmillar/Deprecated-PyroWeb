import React from 'react';

import { Header, Grid, Divider, Segment, Label, Icon } from 'semantic-ui-react'

//import PropTypes from 'prop-types';

// import XmlHighlight from '../../CodeHighlight/XmlHighlight'
import JsonHighlight from '../../CodeHighlight/JsonHighlight'
import HttpHighlight from '../../CodeHighlight/HttpHighlight'



export default class ResponseRender extends React.Component {

    static propTypes = {

    }

    static defaultProps = {
    }

    constructor(props) {
        super(props);

        this.state = {

        };
    }


    render() {


        const tester = () => {
            let codeString = '';
            //80 Charaters
            // codeString = codeString.concat('12345678901234567890123456789012345678901234567890123456789012345678901234567890\n');        
            codeString = codeString.concat('Accept-Charset: utf-8 \n');
            codeString = codeString.concat('Accept: application/fhir+xml;q=1.0, application/fhir+json;q=1.0, application/xml+fhir;q=0.9, application/json+fhir;q=0.9 \n');
            codeString = codeString.concat('User-Agent: HAPI-FHIR/3.7.0-SNAPSHOT (FHIR Client; FHIR 3.0.1/DSTU3; apache)\n');
            codeString = codeString.concat('Accept-Encoding: gzip\n');
           
            return codeString;
        }

        const testerBody = () => {
            let codeString = '';
            //80 Charaters
            // codeString = codeString.concat('12345678901234567890123456789012345678901234567890123456789012345678901234567890\n');        
            codeString = codeString.concat('{\n');
            codeString = codeString.concat('    "resourceType": "OperationOutcome",\n');
            codeString = codeString.concat('    "text": {\n');
            codeString = codeString.concat('        "div": "<div xmlns=\\"http://www.w3.org/1999/xhtml\\">\\r\\n  <div>\\r\\n    <h4>OperationOutcome Issue: 1</h4>\\r\\n    <table>\\r\\n      <tr>\\r\\n        <td>\\r\\n          <span>\\r\\n            <b>Severity: </b>\\r\\n          </span>\\r\\n        </td>\\r\\n        <td>\\r\\n          <span>error</span>\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td>\\r\\n          <span>\\r\\n            <b>Type: </b>\\r\\n          </span>\\r\\n        </td>\\r\\n        <td>\\r\\n          <span>exception</span>\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td>\\r\\n          <span>\\r\\n            <b>Detail Text: </b>\\r\\n          </span>\\r\\n        </td>\\r\\n        <td>\\r\\n          <span>Some error message abount the problem</span>\\r\\n        </td>\\r\\n      </tr>\\r\\n    </table>\\r\\n  </div>\\r\\n</div>"\n');
            codeString = codeString.concat('    },\n');
            codeString = codeString.concat('    "issue": [\n');
            codeString = codeString.concat('        {\n');
            codeString = codeString.concat('            "severity": "error",\n');
            codeString = codeString.concat('            "code": "exception",\n');
            codeString = codeString.concat('            "details": {\n');
            codeString = codeString.concat('                "text": "Some error message abount the problem"\n');
            codeString = codeString.concat('            }\n');
            codeString = codeString.concat('        }\n');
            codeString = codeString.concat('    ]\n');
            codeString = codeString.concat('}\n');
            return codeString;
        }

        return (
            <Segment raised color='black'>


                <Grid.Row columns={1}>
                    <Grid.Column width={16}>
                        <Segment.Group>
                            <Segment >
                                <Grid inverted columns={3} divided>
                                    <Grid.Row stretched columns={3} color='black'>
                                        <Grid.Column width={3}>
                                            <Header inverted size='tiny'>Request</Header>
                                        </Grid.Column>                                        
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                            <Segment>
                                <Grid columns={2} divided>
                                    <Grid.Row columns={2}>
                                        <Grid.Column verticalAlign='middle' width={2}>
                                            <Header size='tiny'>URL</Header>
                                        </Grid.Column>
                                        <Grid.Column width={14} verticalAlign='middle'>
                                            <HttpHighlight code='GET https://stu3.test.pyrohealth.net/fhir/Observation?famly=millar&given=angus' />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                            <Segment>
                                <Grid columns={2} divided>
                                    <Grid.Row stretched columns={2}>
                                        <Grid.Column verticalAlign='middle' width={2}>
                                            <Header size='tiny'>Request Headers</Header>
                                        </Grid.Column>
                                        <Grid.Column verticalAlign='middle' width={14}>
                                            <HttpHighlight code={tester()} />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>
                </Grid.Row>

                <Divider horizontal hidden></Divider>

                <Grid.Row columns={1}>
                    <Grid.Column width={16}>
                        <Segment.Group>
                            <Segment >
                                <Grid inverted columns={2} divided>
                                    <Grid.Row columns={2} color='black'>
                                        <Grid.Column width={2}>
                                            <Header inverted size='tiny'>Response</Header>
                                        </Grid.Column>                                        
                                        <Grid.Column width={4}>
                                            {/* <Label color='green'><Icon name='thumbs up'></Icon>OK 200</Label> */}
                                            <Label color='red'><Icon name='thumbs down'></Icon>Bad Request 400</Label>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>                            
                            <Segment>
                                <Grid columns={2} divided>
                                    <Grid.Row stretched columns={2}>
                                        <Grid.Column verticalAlign='middle' width={2}>
                                            <Header size='tiny'>Response Headers</Header>
                                        </Grid.Column>
                                        <Grid.Column verticalAlign='middle' width={14}>
                                            <HttpHighlight code={tester()} />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                            <Segment>
                                <Grid columns={2} divided>
                                    <Grid.Row stretched columns={2}>
                                        <Grid.Column verticalAlign='middle' width={2}>
                                            <Header size='tiny'>Response Body</Header>
                                        </Grid.Column>
                                        <Grid.Column verticalAlign='middle' width={14}>
                                        <JsonHighlight code={testerBody()} />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>
                </Grid.Row>



            </Segment>
        )
    }

}
