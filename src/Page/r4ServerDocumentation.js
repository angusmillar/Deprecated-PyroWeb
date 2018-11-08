import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Icon, Segment } from 'semantic-ui-react';

import MainLogo from '../Componets/SiteLogo/MainLogo'
import DeviceConstants from '../Constants/DeviceConstants';
import DocumentItemGrid from '../Componets/ServerDocumentation/DocumentItemGrid'
import map from 'lodash/map';
import WebLink from '../Componets/Reusable/WebLink/WebLink';

export default class r4ServerDocumentation extends React.Component {

    static propTypes = {
        siteIcon: PropTypes.string.isRequired,
        FhirIcon: PropTypes.string,
    }

    static defaultProps = {
        FhirIcon: require('../Images/FhirIcon/icon-fhir-32.png')
    }

    constructor(props) {
        super(props);
    }

    render() {

        const pageTitle = ' R4 Server Docuemntation';
        const computerSize = 'large';
        const tabletSize = 'small';
        const mobileSize = 'tiny';

        const DocoArray = [
            {
                Command: 'ServiceBaseURL',
                ValueType: 'URL',
                Default: '[no default]',
                Example: '<add key="ServiceBaseURL" value="https://stu3.test.pyrohealth.net/fhir" />',
                Description: 'This setting sets the service\'s Service Base URL and must match the URL where the service is hosted. Care must be taken changing this URL post the service being in operation as the physical Resources and the search indexes in the database, and any external references with still have the previous URL reference. In practice, all Resource would need to be updated and recommitted. Simply changing this setting here does not perform those references updates.'
            },
            {
                Command: 'FHIRApiAuthentication',
                ValueType: 'Boolean',
                Default: 'true',
                Example: '<add key="FHIRApiAuthentication" value="false" />',
                Description: 'The server has integration to an OAuth2 authentication service to manage client access to the FHIR API utilising SMART on FHIR scopes. This command disables this authentication from taking place and allows open access to the complete API. Setting this command to False must be done with great caution and been see as a serious security risk.',
            },
            {
                Command: 'AuthenticationServerUrl',
                ValueType: 'URL',
                Default: '[none]',
                Example: '<add key="AuthenticationServerUrl" value="https://localhost:44300/" />',
                Description: 'The server has integration to an OAuth2 authentication service to manage client access to the FHIR API utilising SMART on FHIR scopes. If the command \'FHIRApiAuthentication\' is set to True the this command must be set to provides the FHIR server the URL endpoint where the authentication service is located, other wise this command can be ignored.'
            },
            {
                Command: 'ThisServersEntityCode',
                ValueType: 'String',
                Default: 'ThisServersEntityCode_HasNotBeenSet',
                Example: '<add key="ThisServersEntityCode" value="TestPyroServer" />',
                Description: 'The code that represents this instance of the server as an entity. For instance, if this server was owned and operated by ACME Health Group at their Western Australian Hospital they might have a code \'AcmeWAFhirServer\' and a System of https://AcmeHealthGroup.com.au/CodeSystem/WA/Server This is used whenever this server needs to be identified, such as writing AuditEvent Records where the server is an actor in the event.'
            },
            {
                Command: 'ThisServersEntitySystem',
                ValueType: 'URI',
                Default: 'http://ThisServersEntitySystem.HasNot/BeenSet',
                Example: '<add key="ThisServersEntitySystem" value="https://Pyrohealth.net/Codesystem/ServerInstance" />',
                Description: 'The code\'s System that represents this instance of the server as an entity. For instance, if this server was owned and operated by ACME Health Group at their Western Australian Hospital they might have a code \'AcmeWAFhirServer\' and a System of https://AcmeHealthGroup.com.au/CodeSystem/WA/Server This is used whenever this server needs to be identified, such as writing AuditEvent Records where the server is an actor in the event.'
            },
            {
                Command: 'ThisServersManagingOrganizationResource',
                ValueType: 'FHIR Rsource Reference',
                Default: 'http://ThisServersEntitySystem.HasNot/BeenSet',
                Example: '<add key="ThisServersManagingOrganizationResource" value="Organization/ACMEHealthOrginization" />',
                Description: 'The ManagingOrganizationResource is a FHIR Resource Reference to a FHIR Organization Resource located at the given endpoint. This can be relative (meaning it is found in this server), such as \'Organization/MyOrganization\' or absolute and possibly in a different accessible server somewhere i.e \'https://SomeServerSomeWhere.com/Fhir/Organization/MyOrganization\' If you do not have such a resource for now then just set the command to empty string or comment the command out.'
            },
            {
                Command: 'LoadFhirSpecificationResources',
                ValueType: 'Boolean',
                Default: 'true',
                Example: '<add key="LoadFhirDefinitionResources" value="True" />',
                Description:
                        <div><p>When set to True the server will load all the reference resources from the FHIR specification.
                        These are the files found for download here: <WebLink newTab={true} url='http://hl7.org/fhir/2018Sep/downloads.html' display='Specification Downloads' />, see &apos;FHIR Definitions&apos;,
                        which contain all the value sets, profiles, etc. defined as part of the FHIR specification, and the included
                        implementation guides.</p>

                        <p>When this command is set to True the server on start-up will kick off a background task to load the resources.
                        This task can be monitored by retrieving the FHIR Task resource with the resource id &apos;<code>Load-Fhir-Definition-Resources</code>&apos;. For 
                        example, <code>GET: [base]/Task/Load-Fhir-Definition-Resources</code> will return a Task resource detailing the
                        progress of the load. The server can be stopped and restarted and the task will continue loading from where
                        it left off.</p>

                        <p>This task will take a significant amount of time to finish, up to 2 hours on our development laptop, it loads
                        in total 7,680 resources. The task loads a set of Resource bundles as follows: conceptmaps.xml, dataelements.xml,
                        extension-definitions.xml, profiles-others.xml, profiles-resources.xml, profiles-types.xml, search-parameters.xml,
                        v2-tables.xml, v3-codesystems.xml, valuesets.xml. If the server is stopped while processing the task it will
                        cause the task to start again on the last .xml file it was processing.</p>

                        <p>If the server is started with this command set to True the process is not reversible. Setting the command
                            back to False, and restarting the server, will stop the background task from continuing yet it will not
                            reverse or delete the FHIR resources it has already loaded. Setting it back to True, and restarting the
                            server, will start the background task again picking up from where it left off. Once all resources are
                            loaded the background task will not run again regardless of this command being True or False. Once again
                            you can monitor the progress of the task by getting the Task Resource: <code>GET: [base]/Task/Load-Fhir-Definition-Resources</code></p>
                    </div>
            },
            {
                Command: 'ApplicationCacheServicesActive',
                ValueType: 'Boolean',
                Default: 'true',
                Example: '<add key="ApplicationCacheServicesActive" value="True" />',
                Description: <p>This setting turns on or off the Application Cache. 
                This is primarily turned off to assist in debugging where the caching can complicate 
                the debugging process. Under normal production operation this should be set to True.
                </p>
            },
            {
                Command: 'NumberOfRecordsPerPageDefault',
                ValueType: 'Integer',
                Default: '50',
                Example: '<add key="NumberOfRecordsPerPageDefault" value="100" />',
                Description: <p>This setting is to set the default number of Resource returned in a bundle, for example,
                in a FHIR search call. The default can be over-ridden per API call using the <code>_count</code> search parameter
                in the call.
                </p>
            },
            {
                Command: 'MaxNumberOfRecordsPerPage',
                ValueType: 'Integer',
                Default: '500',
                Example: '<add key="MaxNumberOfRecordsPerPage" value="200" />',
                Description: <div><p>This setting is to set the absolute maximum number of Resource that can be requested 
                when using the <code>_count</code> search parameter. For example, if an API caller sets the parameter <code>_count=500</code> and 
                this command &apos;<code>MaxNumberOfRecordsPerPage</code>&apos; is set to 200 then the <code>_count</code> search parameter value 
                will be ignored and only 200 will be returned. </p>
                <p>This is to prevent users asking for a <code>_count</code> value 
                    that is too large, resulting in poor performance of the service. Also, beware that the service has 
                an internal setting called &apos;<code>SystemDefaultMaxNumberOfRecordsPerPage</code>&apos; that can not be changed by 
                configuration. This command &apos;<code>MaxNumberOfRecordsPerPage</code>&apos; cannot exceed the 
                &apos;<code>SystemDefaultMaxNumberOfRecordsPerPage</code>&apos; command which is currently set at 5000 and 
                will default to the &apos;<code>SystemDefaultMaxNumberOfRecordsPerPage</code>&apos; of 5000 if set higher.
                </p>
                </div>
            },
            {
                Command: 'FhirAuditEventLogRequestData',
                ValueType: 'Boolean',
                Default: 'true',
                Example: '<add key="FhirAuditEventLogRequestData" value="False" />',
                Description: <p>Every request made to the server&apos;s FHIR API is audited as a FHIR AuditEvent resource.
                When this setting is set to True an Audit.Entity instance will be added to these resources containing 
                the original request data including the entire Resource contained in the request where one is given.
                If set to False this entity will not be added however an AuditEvent resources will still be created for every 
                request with all the other properties of the request.
                This is primarily set to False to prevent the AuditEvent resources growing excessively in size on disk.
                </p>
            },
            {
                Command: 'FhirAuditEventLogResponseData',
                ValueType: 'Boolean',
                Default: 'true',
                Example: '<add key="FhirAuditEventLogResponseData" value="False" />',
                Description: <p>Every request made to the server&apos;s FHIR API is audited as a FHIR AuditEvent resource.
                When this setting is set to True an Audit.Entity instance will be added to these resources containing 
                the original response data including the entire Resource returned in requests where one is given.
                If set to False this entity will not be added however an AuditEvent resources will still be created for every 
                request with all the other properties of the request.
                This is primarily set to False to prevent the AuditEvent resources growing excessively in size on disk.
                </p>
            },
            {
                Command: 'ServerReadOnlyMode',
                ValueType: 'Boolean',
                Default: 'false',
                Example: '<add key="ServerReadOnlyMode" value="False" />',
                Description: <p>When this setting is set to &apos;True&apos; the server will response to all Create, Update and Delete actions with
                an OperationOutcome and the HTTP Status of &apos;<code>503: ServiceUnavailable</code>&apos;. The default message supplied will be: 
                &apos;<i>The FHIR Server is currently in a read only mode.</i>&apos;
                When set to &apos;False&apos; the server will operate as normal.
                </p>
            },
            {
                Command: 'ServerReadOnlyModeMessage',
                ValueType: 'String',
                Default: '[none]',
                Example: '<add key="ServerReadOnlyModeMessage" value="The server will be in read only mode for 15 min and is planned to be back at 3:00 PM" />',
                Description: <p>When the setting &apos;<code>ServerReadOnlyMode</code>&apos; is &apos;True&apos; the server will response to all Create, Update and Delete actions with
                an OperationOutcome and the HTTP Status of &apos;<code>503: ServiceUnavailable</code>&apos;. The default message supplied will be: 
                <i>The FHIR Server is currently in a read only mode.</i>
                This setting &apos;<code>ServerReadOnlyModeMessage</code>&apos; gives the opportunity to provide an extra custom message that 
                will be appended to the default message above.
                </p>
            }
        ];

        const renderDocuemntation = (size) => {
            const DocoArrayCount = DocoArray.length;
            return (
                <div>
                    <Segment size='small'>
                        <Header size={size} color='black'>
                            <Icon name='settings' />
                            <Header.Content>
                                {pageTitle}
                            </Header.Content>
                        </Header>
                        
                        <Header>Pyro Application Configuration File: <code>PyroApp.config</code></Header>
                        <p>
                            The Pyro Server has a global configuration file containing a number of commands that can be configured for the server instance. These commands are found within an application settings file
                            named <code>PyroApp.config</code> which is found in the server&apos;s root directory within the folder named <code>App_Data</code>. Each avalable command is docuemnted below.
                        </p>
                        
                        <Grid stackable padded='horizontally'>
                            <Grid.Row columns={1}>
                                <Grid.Column width={16}>
                                    {map(DocoArray, (DocRow, Index) => {
                                        if (DocoArrayCount == Index + 1) {
                                            return (
                                                <DocumentItemGrid key={Index} documentItem={DocRow} includeDivider={false}></DocumentItemGrid>
                                            )
                                        } else {
                                            return (
                                                <DocumentItemGrid key={Index} documentItem={DocRow} includeDivider={true}></DocumentItemGrid>
                                            )
                                        }
                                    })}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </div>
            )
        };

        return (
            <Grid stackable >
                <Grid.Row columns={2} only='computer'>
                    <Grid.Column width={8} verticalAlign='middle' >
                        <Header>{pageTitle}</Header>
                    </Grid.Column>
                    <Grid.Column width={8} >
                        <MainLogo siteIcon={this.props.siteIcon} deviceType={DeviceConstants.deviceType.computer} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} only='computer'>
                    <Grid.Column width={16}>
                        {renderDocuemntation(computerSize)}
                    </Grid.Column>
                </Grid.Row>



                <Grid.Row columns={2} only='tablet'>
                    <Grid.Column width={8} verticalAlign='middle' >
                        <Header>{pageTitle}</Header>
                    </Grid.Column>
                    <Grid.Column width={8} >
                        <MainLogo siteIcon={this.props.siteIcon} deviceType={DeviceConstants.deviceType.tablet} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={1} only='tablet'>
                    <Grid.Column width={16}>
                        {renderDocuemntation(tabletSize)}
                    </Grid.Column>
                </Grid.Row>



                <Grid.Row columns={2} only='mobile'>
                    <Grid.Column width={8} verticalAlign='middle' >
                        <Header>{pageTitle}</Header>
                    </Grid.Column>
                    <Grid.Column width={8} >
                        <MainLogo siteIcon={this.props.siteIcon} deviceType={DeviceConstants.deviceType.mobile} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1} only='mobile'>
                    <Grid.Column width={16}>
                        {renderDocuemntation(mobileSize)}
                    </Grid.Column>
                </Grid.Row>



                <Grid.Column width={16}>
                </Grid.Column>
            </Grid >
            // </Container>
        )
    }

}

