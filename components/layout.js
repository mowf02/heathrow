import React, { Component } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import customData from '../data.json'
import '../main.scss'

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
};

export default class Layout extends React.Component {
  constructor(props) {
    super(props);

    const minDate = new Date("1958-01-01");
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      graphData: [],
      minDate: minDate,
      maxDate: maxDate,
      autoOk: true,
      option: '',
      disableYearSelection: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.returnGraphData(this.state.minDate, this.state.maxDate, this.state.option)
  }

  handleChangeMinDate(event, date) {
    this.setState({
      minDate: date
    });
  };

  handleChangeMaxDate(event, date) {
    this.setState({
      maxDate: date
    });
  };

  setOption(value) {
    this.setState({option: value});
  }

  returnGraphData(from, to, option) {
    var tempData = []
    for (let i = 0; i < customData.length; i++) {
      if ((customData[i].yyyy - from.getFullYear()) * (customData[i].yyyy - to.getFullYear()) <= 0) {
        var dataObject = new Object();
        dataObject.name = customData[i].yyyy;
        dataObject.value = parseInt(customData[i][option]);
        tempData.push(dataObject)
      }
    }
    this.setState({graphData: tempData});
  }

  render() {
    return (
      <section className="layout__container">
        <figure className="layout__graph-wrapper">
          <ResponsiveContainer width='100%' heigth='100%' aspect={4.0/3.0}>
            <LineChart data={this.state.graphData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </figure>
        <aside className="layout__input-wrapper">
        <div className="datepicker">
          <DatePicker
          floatingLabelText="1. Select a date"
          autoOk={this.state.autoOk}
          minDate={this.state.minDate}
          maxDate={this.state.maxDate}
          disableYearSelection={this.state.disableYearSelection}
          />
          <div style={optionsStyle}>
            <DatePicker
            onChange={this.handleChangeMinDate.bind(this)}
            autoOk={this.state.autoOk}
            floatingLabelText="Start Date"
            defaultDate={this.state.minDate}
            disableYearSelection={this.state.disableYearSelection}
            />
            <DatePicker
            onChange={this.handleChangeMaxDate.bind(this)}
            autoOk={this.state.autoOk}
            floatingLabelText="End Date"
            defaultDate={this.state.maxDate}
            disableYearSelection={this.state.disableYearSelection}
            />
          </div>
        </div>
          <div className="optionfilter">
            <header className="optionfilter__header">2. Select an option</header>
            <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
              <RadioButton
                value="light"
                label="Max. Temperature"
                style={styles.radioButton}
                onClick={(e) => this.setOption('tmax_C')}
                checked={ this.state.option === 'tmax_C' }
                value="tmax_C"
              />
              <RadioButton
                value="light"
                label="Min. Temperature"
                style={styles.radioButton}
                onChange={(e) => this.setOption('tmin_C')}
                checked={ this.state.option === 'tmin_C' }
                value="tmin_C"
              />
              <RadioButton
                value="light"
                label="Rainfall"
                style={styles.radioButton}
                onChange={(e) => this.setOption('rain_mm')}
                checked={ this.state.option === 'rain_mm' }
                value="rain_mm"
              />
              <RadioButton
                value="light"
                label="Sunshine Hours"
                style={styles.radioButton}
                onChange={(e) => this.setOption('sunshine_hours')}
                checked={ this.state.option === 'sunshine_hours' }
                value="sunshine_hours"
              />
            </RadioButtonGroup>
          </div>
          <RaisedButton label="Display" primary={true} type="submit" value="Submit" onClick={ this.handleSubmit.bind(this) } />
        </aside>
      </section>
    );
  }
}
