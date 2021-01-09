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
        dateInputValue: '',
        changeInputValue: 'day'
    };

    showInput = () => this.setState({ isInputShown: true });

    onDateInputChange = ({ target: { value } }) => this.setState({
        dateInputValue: value
    });

    onChangeInputChange = ({ target: { value } }) => this.setState({
        changeInputValue: value
    });

    createDay = () => {
        if (this.state.dateInputValue && this.state.changeInputValue) {
            this.props.addTasklistDispatch({tasklistDay: this.state.dateInputValue, 
                                        tasklistChange: this.state.changeInputValue});
        }

        this.setState({
            isInputShown: false,
            dateInputValue: '',
            changeInputValue: 'day'
        })
    }

    onKeyDown = (event) => {
        if (event.key === 'Escape') {
            this.setState({
                isInputShown: false,
                dateInputValue: '',
                changeInputValue: 'day'
            });
            
            return;
        }
    };

    render() {
        const { isInputShown, dateInputValue, changeInputValue } = this.state;
        const { tasklists } = this.props;

        return (
            <Fragment>
                <header id="main-header">
                <h3>Личный кабинет врача</h3>
                <div id="profile-info">
                    <div id="profile-info-text">Перри Кокс</div>
                    <div id="profile-info-avatar"></div>
                </div>
                </header>

                <main id="main-content-container">
                    <div id="main-content">
                        {tasklists.map((tasklist, index) => (
                            <Tasklist 
                                tasklistDay={tasklist.tasklistDay}
                                tasklistChange={tasklist.tasklistChange}
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
                                        Добавить день...
                                    </span>
                                )}
                                
                                {isInputShown && (
                                    <Fragment>
                                        <label htmlFor="add-list-input-date">Введите дату: </label>
                                        <input
                                            type="date"
                                            id="add-list-input-date"
                                            className="card-add-list-input"
                                            value={dateInputValue}
                                            onChange={this.onDateInputChange}
                                            onKeyDown={this.onKeyDown}
                                        />

                                        <label htmlFor="add-list-input-change">Выберите смену: </label>
                                        <select
                                            id="add-list-input-change"
                                            className="card-add-list-input"
                                            value={changeInputValue}
                                            onChange={this.onChangeInputChange}
                                            onKeyDown={this.onKeyDown}

                                            size="2"
                                        >
                                            <option value="day">Дневная смена</option>
                                            <option value="evening">Вечерняя смена</option>
                                        </select>
                                        
                                        <span id="create-list-button"
                                            className="card-create-list-button" 
                                            onClick={this.createDay}
                                        >
                                            Создать
                                        </span>
                                    </Fragment>
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
    addTasklistDispatch: ({tasklistDay, tasklistChange}) => 
        dispatch(addTasklistAction({tasklistDay, tasklistChange}))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (App);