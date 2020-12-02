import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    addTasklistAction
} from '../../store/actions';
import Tasklist from '../Tasklist/Tasklist';
import './App.css';


class App extends PureComponent {
    state = {
        isInputShown: false,
        inputValue: ''
    };

    showInput = () => this.setState({ isInputShown: true });

    onInputChange = ({ target: { value } }) => this.setState({
        inputValue: value
    });

    onKeyDown = (event) => {
        if (event.key === 'Escape') {
            this.setState({
                isInputShown: false,
                inputValue: ''
            });
            
            return;
        }

        if (event.key === 'Enter') {
            if (this.state.inputValue) {
                this.props.addTasklistDispatch(this.state.inputValue);
            }

            this.setState({
                isInputShown: false,
                inputValue: ''
            })
        }
    };

    render() {
        const { isInputShown, inputValue} = this.state;
        const { tasklists } = this.props;

        return (
            <Fragment>
                <header id="main-header">
                <h3>Custom Task Manager</h3>
                <div id="profile-info">
                    <div id="profile-info-text">Ilya Goltsov</div>
                    <div id="profile-info-avatar"></div>
                </div>
                </header>

                <main id="main-content-container">
                    <div id="main-content">
                        {tasklists.map((tasklist, index) => (
                            <Tasklist 
                                tasklistName={tasklist.tasklistName}
                                tasklistId={index}
                                tasks={tasklist.tasks}
                                key={`list${index}`}
                            />
                        ))}    

                        <div className="element-container">
                            <div className="card card-add-list-container">
                                
                                {!isInputShown && (
                                    <span id="add-list-button"
                                        className="card-add-list-button" 
                                        onClick={this.showInput}
                                    >
                                        Добавить список...
                                    </span>
                                )}
                                
                                {isInputShown && (
                                    <input
                                        type="text"
                                        id="add-list-input"
                                        className="card-add-list-input"
                                        placeholder="Ввести название списка..."
                                        value={inputValue}
                                        onChange={this.onInputChange}
                                        onKeyDown={this.onKeyDown}
                                    />
                                )}

                            </div>
                            
                        </div>
                    </div>
                </main>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ tasklists }) => ({ tasklists });

const mapDispatchToProps = dispatch => ({
    addTasklistDispatch: (tasklistName) => dispatch(addTasklistAction(tasklistName)) 
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (App);