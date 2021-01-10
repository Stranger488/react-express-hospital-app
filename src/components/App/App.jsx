import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { addDaylist as addDaylistServer,
    getDaylists as getDaylistsServer
} from '../../models/AppModel.js';
import {
    addDaylistAction,
    downloadDaylistsAction
} from '../../store/actions';
import Daylist from '../Daylist/Daylist';
import './App.css';

function makeInitpatientsFromHourBounds(leftBound, rightBound) {
    const N = (rightBound - leftBound) * 60 / 20 + 1;
    let patientsArr = [];

    for (let i = 0; i < N; i++) {
        const minutes = (leftBound * 60 + i * 20);
        const hour = Math.floor(minutes / 60);
        const minute = minutes % 60;

        patientsArr[i] = {patientName: '', patientTime: `${hour}:${minute ? minute : '00'}`};
    }

    return patientsArr;
}

class App extends PureComponent {
    state = {
        isInputShown: false,
        dateInputValue: '',
        changeInputValue: 'day'
    };

    async componentDidMount() {
        const daylists = await getDaylistsServer();
        this.props.downloadDaylistsDispatch(daylists);
    }

    showInput = () => this.setState({ isInputShown: true });

    onDateInputChange = ({ target: { value } }) => this.setState({
        dateInputValue: value
    });

    onChangeInputChange = ({ target: { value } }) => this.setState({
        changeInputValue: value
    });

    createDaylist = async () => {
        if (this.state.dateInputValue && this.state.changeInputValue) {
            let bound = [];
            let change = '';
            if (this.state.changeInputValue === 'day') {
                bound = [8, 14];
                change = 'Дневная смена';
            }
            else if (this.state.changeInputValue === 'evening') {
                bound = [14, 20];
                change = 'Вечерняя смена';
            }
            else {
                bound = [8, 14];
                change = 'Дневная смена';
            }

            let tmpArr = makeInitpatientsFromHourBounds(bound[0], bound[1]);

            const info = await addDaylistServer({
                daylistDate: this.state.dateInputValue,
                daylistChange: change,
                patients: [...tmpArr]
            });
            console.log(info);

            this.props.addDaylistDispatch({ 
                daylistDate: this.state.dateInputValue, 
                daylistChange: change,
                patients: [...tmpArr]
             });
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
        const { daylists } = this.props;

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
                        {daylists.map((daylist, index) => (
                            <Daylist 
                                daylistDate={daylist.daylistDate}
                                daylistChange={daylist.daylistChange}
                                daylistId={index}
                                patients={daylist.patients}
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
                                            onClick={this.createDaylist}
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

const mapStateToProps = ({ daylists }) => ({ daylists });

const mapDispatchToProps = dispatch => ({
    addDaylistDispatch: ({ daylistDate, daylistChange, patients }) => 
        dispatch(addDaylistAction({ daylistDate, daylistChange, patients })),
    downloadDaylistsDispatch: (daylists) => 
        dispatch(downloadDaylistsAction(daylists))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (App);