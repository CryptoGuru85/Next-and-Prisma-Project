import React, { PureComponent } from 'react';
import { Checkbox, DatePicker, Select } from 'antd';
// import "./doubleDatePicker.css";
import { CalendarOutlined, ClockCircleFilled } from '@ant-design/icons';
import moment from "moment";
import { timeData } from "./assets/timeData";
import { locale } from "./assets/locale";

const {Option} = Select;

const initialTime = '7:00';

class DoubleDatePicker extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            datePickerState: true,
            startDate: null,
            endDate: null,
            startTimeValue: initialTime,
            endTimeValue: initialTime,
            startTimeValueStartDate: initialTime,
            endTimeValueStartDate: initialTime,
            startTimeValueEndDate: initialTime,
            endTimeValueEndDate: initialTime,
            clickOk: false,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ( this.state.startDate ) {
            const dateFormat = `YYYY-MM-DDT${this.state.startTimeValueStartDate.padStart(5, "0")}:ss.sssZ`;
            this.props.setStartDate(new Date(this.state.startDate.format(dateFormat)));
        }
        if ( this.state.endDate ) {
            const dateFormat = `YYYY-MM-DDT${this.state.startTimeValueEndDate.padStart(5, "0")}:ss.sssZ`;
            this.props.setEndDate(new Date(this.state.endDate.format(dateFormat)));
        }

    }

    disabledStartDate = (startValue) => {
        const endValue = this.state.endDate;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = (endValue) => {
        const startValue = this.state.startDate;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = (value) => {
        this.onChange('startDate', value);
    };

    onEndChange = (value) => {
        this.onChange('endDate', value);
    };
    changeStartDateStartTimePicker = (value) => {
        this.setState({
            startTimeValueStartDate: value,
        }, () => {
        })
    };
    changeStartDateEndTimePicker = (value) => {
        this.setState({
            endTimeValueStartDate: value,
        })
    };

    changeEndDateStartTimePicker = (value) => {
        this.setState({
            startTimeValueEndDate: value,
        }, () => {
        })
    };
    changeEndDateEndTimePicker = (value) => {
        this.setState({
            endTimeValueEndDate: value,
        })
    };

    handleStartOpenChange = (open) => {;
        if (!open) {
            this.setState({endOpen: true});
        } else {
            /*
                        setTimeout(() => setTimeout(() => {
                            var inputs = document.getElementsByClassName("ant-calendar-input");
                        }));
            */
        }
    };

    handleEndOpenChange = (open) => {
        this.setState({endOpen: open});
    };    

    render() {
        const {datePickerState, startValue, endValue, endOpen, startTimeValue, clickOk, endTimeValue, startDate, endDate, startTimeValueStartDate, endTimeValueStartDate, startTimeValueEndDate, endTimeValueEndDate} = this.state;
        const dateFormat = 'MMMM DD ddd';

        const openValue = false;
        const startDateFormat = value => {
            return `${startTimeValueStartDate} - ${endTimeValueStartDate} ${value.format(dateFormat)}`;
        };
        const endDateFormat = value => {
            return `${startTimeValueEndDate} - ${endTimeValueEndDate} ${value.format(dateFormat)}`;
        }

        return (<>
                <div id="date-english" className="inputContainer" style={{display: "grid", gridTemplateColumns:"1fr 4fr"}}>
                    <p className="date-picker-label" style={{width:"219px"}}>Date</p>
                    <div className="flex group-datepicker" style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                        <DatePicker
                            disabledDate={this.disabledStartDate}
                            showTime
                            format={startDateFormat}
                            value={startDate}
                            placeholder="Start"
                            locale={locale}
                            dropdownClassName="english-date-picker start"
                            className="date-pick"
                            getPopupContainer={() => document.getElementById('date-english')}

                            onChange={this.onStartChange}
                            onOpenChange={this.handleStartOpenChange}
                            renderExtraFooter={() => (<>
                                <div className="flex">
                                    <div className="start-end-date-display-section">
                                        <div className="start-date">
                                            <CalendarOutlined className="calender-icon"/>
                                            <p className="date-selected">

                                                {
                                                    startDate !== null ?      moment(startDate).format('DD MMMM') : moment().format('DD MMMM')
                                                }
                                            </p>
                                        </div>
                                        <div className="end-date">
                                            <CalendarOutlined className="calender-icon"/>
                                            <p className="date-selected">

                                                {
                                                    endDate !== null ?      moment(endDate).format('DD MMMM') : moment().format('DD MMMM')
                                                }
                                            </p>
                                        </div>

                                    </div>
                                    <div className="select-time" id="select-time">
                                        {
                                            clickOk === false &&
                                            <>
                                                <div className="start-date-section">
                                                    <Select
                                                        getPopupContainer={() => document.getElementById('select-time')}
                                                        dropdownClassName="start-end-time-select"
                                                        onSelect={this.changeStartDateStartTimePicker}
                                                        defaultValue={"7:00"} style={{width: 120}} bordered={false}>
                                                        {
                                                            timeData.map((data, index) => (
                                                                <Option value={data.value} key={data.value}>
                                                                    <div className="flex time-option">
                                                                        <p className="time">{data.text} </p>
                                                                        <p className="unit">{data.unit} </p>
                                                                        <Checkbox
                                                                            checked={data.value === startTimeValueStartDate}
                                                                            defaultChecked={data.value === startTimeValueStartDate}
                                                                            className="date-checkbox"/>
                                                                    </div>
                                                                </Option>
                                                            ))
                                                        }
                                                    </Select>
                                                    <div className="start-label">
                                                        <ClockCircleFilled className="clock-icon"/>
                                                        <p className="label">Start time:</p>
                                                    </div>
                                                </div>
                                                <div className="start-date-section">

                                                    <Select
                                                        getPopupContainer={() => document.getElementById('select-time')}
                                                        dropdownClassName="start-end-time-select"
                                                        onSelect={this.changeStartDateEndTimePicker}
                                                        defaultValue={"7:00"} style={{width: 120}} bordered={false}>
                                                        {
                                                            timeData.map((data, index) => (
                                                                <Option value={data.value} key={data.value}>
                                                                    <div className="flex time-option">
                                                                        <p className="time">{data.text} </p>
                                                                        <p className="unit">{data.unit} </p>
                                                                        <Checkbox
                                                                            checked={data.value === endTimeValueStartDate}
                                                                            defaultChecked={data.value === endTimeValueStartDate}
                                                                            className="date-checkbox"/>
                                                                    </div>
                                                                </Option>
                                                            ))
                                                        }
                                                    </Select>
                                                    <div className="start-label">
                                                        <ClockCircleFilled className="clock-icon"/>
                                                        <p className="label">End time:</p>
                                                    </div>
                                                </div>

                                            </>
                                        }

                                    </div>
                                </div>
                            </>)}
                            allowClear={false}
                            suffixIcon={null}
                        />
                        <DatePicker
                            disabledDate={this.disabledEndDate}
                            showTime
                            format={endDateFormat}
                            value={endDate}
                            locale={locale}
                            dropdownClassName="english-date-picker second"
                            className="date-pick"
                            getPopupContainer={() => document.getElementById('date-english')}
                            placeholder="End"
                            onChange={this.onEndChange}
                            open={endOpen}
                            onOpenChange={this.handleEndOpenChange}
                            renderExtraFooter={() => (<>
                                <div className="flex">
                                    <div className="start-end-date-display-section">
                                        <div className="start-date">
                                            <CalendarOutlined className="calender-icon"/>
                                            <p className="date-selected">

                                                {
                                                    startDate !== null ? moment(startDate).format('DD MMMM') : moment().format('DD MMMM')
                                                }
                                            </p>
                                        </div>
                                        <div className="end-date">
                                            <CalendarOutlined className="calender-icon"/>
                                            <p className="date-selected">

                                                {
                                                    endDate !== null ? moment(endDate).format('DD MMMM')
                                                        : moment().format('DD MMMM')

                                                }
                                            </p>
                                        </div>

                                    </div>
                                    <div className="select-time" id="select-time-end-date">
                                        {
                                            clickOk === false &&
                                            <>
                                                <div className="start-date-section">
                                                    <Select
                                                        getPopupContainer={() => document.getElementById('select-time-end-date')}
                                                        dropdownClassName="start-end-time-select"
                                                        onSelect={this.changeEndDateStartTimePicker}
                                                        defaultValue={"7:00"} style={{width: 120}} bordered={false}>
                                                        {
                                                            timeData.map((data, index) => (
                                                                <Option value={data.value} key={data.value}>
                                                                    <div className="flex time-option">
                                                                        <p className="time">{data.text} </p>
                                                                        <p className="unit">{data.unit} </p>
                                                                        <Checkbox
                                                                            checked={data.value === startTimeValueEndDate}
                                                                            defaultChecked={data.value === startTimeValueEndDate}
                                                                            className="date-checkbox"/>
                                                                    </div>
                                                                </Option>
                                                            ))
                                                        }
                                                    </Select>
                                                    <div className="start-label">
                                                        <ClockCircleFilled className="clock-icon"/>
                                                        <p className="label">Start time:</p>
                                                    </div>
                                                </div>
                                                <div className="start-date-section">

                                                    <Select
                                                        getPopupContainer={() => document.getElementById('select-time-end-date')}
                                                        dropdownClassName="start-end-time-select"
                                                        onSelect={this.changeEndDateEndTimePicker}
                                                        defaultValue={"7:00"} style={{width: 120}} bordered={false}>
                                                        {
                                                            timeData.map((data, index) => (
                                                                <Option value={data.value} key={data.value}>
                                                                    <div className="flex time-option">
                                                                        <p className="time">{data.text} </p>
                                                                        <p className="unit">{data.unit} </p>
                                                                        <Checkbox
                                                                            checked={data.value === endTimeValueEndDate}
                                                                            defaultChecked={data.value === endTimeValueEndDate}
                                                                            className="date-checkbox"/>
                                                                    </div>
                                                                </Option>
                                                            ))
                                                        }
                                                    </Select>
                                                    <div className="start-label">
                                                        <ClockCircleFilled className="clock-icon"/>
                                                        <p className="label">End time:</p>
                                                    </div>
                                                </div>

                                            </>
                                        }

                                    </div>
                                </div>
                            </>)}
                            allowClear={false}
                            suffixIcon={null}
                        />

                    </div>


                </div>
            </>
        );
    }

}

export default DoubleDatePicker;
