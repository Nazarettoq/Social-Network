import React, { ChangeEvent } from 'react';

type PropsType={
  status:string
  updateStatus:(newStatus:string)=>void
}
type StateType={
  editMode:boolean
  status:string
}
class ProfileStatus extends React.Component <PropsType,StateType> {
  state = {
    editMode: false,
    status: this.props.status,
  };

  componentDidUpdate(prevProps:PropsType, prevState:StateType) {
    if (this.props.status !== prevProps.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }
  activateEdinMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEdinMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };
  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };
  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEdinMode}>{this.props.status || 'About me'}</span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              autoFocus={true}
              onChange={this.onStatusChange}
              onBlur={this.deactivateEdinMode}
              value={this.state.status}
            />
          </div>
        )}
      </div>
    );
  }
}
export default ProfileStatus;
