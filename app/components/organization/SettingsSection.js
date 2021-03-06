import React from 'react';
import Relay from 'react-relay';

import PageWithMenu from '../shared/PageWithMenu';
import SettingsMenu from './SettingsMenu';

class SettingsSection extends React.Component {
  static propTypes = {
    organization: React.PropTypes.object.isRequired,
    children: React.PropTypes.node.isRequired
  };

  render() {
    return (
      <PageWithMenu>
        <SettingsMenu organization={this.props.organization} />
        {this.props.children}
      </PageWithMenu>
    );
  }
}

export default Relay.createContainer(SettingsSection, {
  fragments: {
    organization: () => Relay.QL`
      fragment on Organization {
        ${SettingsMenu.getFragment('organization')}
      }
    `
  }
});
