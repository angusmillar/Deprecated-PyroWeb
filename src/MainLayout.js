import React from 'react'
import PropTypes from 'prop-types';
import MainMenu from 'MainMenu';
import MainFooter from 'MainFooter';
import Home from 'Home';
import DunnyContent from 'DunnyContent';

//import { Container, Header} from 'semantic-ui-react'

class MainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentPage: 'home', currentPageProps: null };
        this.setCurrentPage = this.setCurrentPage.bind(this);
    }

    setCurrentPage(event, { page, props }) {
        if (event) event.preventDefault();
        this.setState({ currentPage: page, currentPageProps: props });
    }

    currentPage() {
        return {
            home: <Home />,
            dunnyContent: <DunnyContent siteIconProp={this.props.siteIconProp} />,
        }[this.state.currentPage];
    }

    render() {
        return (
            <div>                                
                {
                    React.cloneElement(<MainMenu siteIconProp={this.props.siteIconProp}/>, {
                        setCurrentPage: this.setCurrentPage,
                        currentPage: this.state.currentPage,
                        ...this.state.currentPageProps,
                    })
                }
                {
                    React.cloneElement(this.currentPage(), {
                        setCurrentPage: this.setCurrentPage,
                        currentPage: this.state.currentPage,
                        ...this.state.currentPageProps,
                    })
                }
                <MainFooter siteIconProp={this.props.siteIconProp} />
            </div>
        )
    }

}

MainLayout.propTypes = {
    siteIconProp: PropTypes.string,
}

MainLayout.defaultProps = {
    siteIconProp: require('./Images/PyroIcon-100.png')
}

export default MainLayout