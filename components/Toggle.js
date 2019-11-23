import * as React from 'react';
import { ToggleButton } from 'react-native-paper';

class ToggleButtonExample extends React.Component {
  state = {
    status: 'checked',
  };

  render() {
    return (
      <ToggleButton
        icon="bluetooth"
        value="bluetooth"
        status={this.state.status}
        onPress={value =>
          this.setState({
            status: value === 'checked' ? 'unchecked' : 'checked',
          })
        }
      />
    );
  }
}

export default ToggleButtonExample