import React, { Component } from 'react';
import styled from 'styled-components';
import TodoModel from 'components/models/TodoModel';
import { connect } from 'react-redux';
import { getTodosToday, getDoneTodos } from 'actions';
import propTypes from 'prop-types';

const StyledWrapper = styled.section`
  width: 100%;
  min-height: 100%;
`;

class TodoTemplate extends Component {
  state = {
    day: 0,
    month: 0,
    year: 0,
  };

  componentDidMount() {
    const { getTodos, getDone } = this.props;
    const userId = sessionStorage.getItem('key');

    const todayDate = new Date();
    let day = todayDate.getDate();
    let month = todayDate.getMonth();
    const year = todayDate.getFullYear();

    this.setState({
      day,
      month,
      year,
    });

    day = this.addZeroToDate(day);
    month = this.addZeroToDate(month);

    const fullTodayDate = `${year}-${month}-${day - 1}`;

    getTodos(userId);
    getDone(userId, fullTodayDate);
  }

  addZeroToDate = day => {
    if (day < 10) {
      return `0${day}`;
    }
    return day;
  };

  render() {
    const { todos, todoDone } = this.props;
    const { day, month, year } = this.state;

    const NamesOfDays = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];

    return (
      <StyledWrapper>
        {todos.length !== 0
          ? NamesOfDays.map((element, index) => {
              const dateToday = new Date(year, month, day + index);
              const todayDayName = NamesOfDays[dateToday.getDay()];
              let todayDay = dateToday.getDate();
              let todayMonth = dateToday.getMonth();
              const todayYear = dateToday.getFullYear();

              todayDay = this.addZeroToDate(todayDay);
              todayMonth = this.addZeroToDate(todayMonth);

              const yesterdayDate = new Date(todayYear, todayMonth, todayDay - 1);

              let yesterdayDay = yesterdayDate.getDate();
              let yesterdayMonth = yesterdayDate.getMonth();
              const yesterdayYear = yesterdayDate.getFullYear();

              yesterdayMonth += 1;

              yesterdayDay = this.addZeroToDate(yesterdayDay);
              yesterdayMonth = this.addZeroToDate(yesterdayMonth);

              const fullYesterdayDate = `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}T22:00:00.000Z`;

              return todos.length !== 0 ? (
                // aktualny dzień
                <TodoModel
                  date={{
                    todayDayName,
                    todayDay,
                    todayMonth,
                    todayYear,
                  }}
                  // zadania zrobione przeznowaczone dla tego dnia
                  todoDone={todoDone.map((e, i) =>
                    e.date === fullYesterdayDate ? todoDone[i] : null,
                  )}
                  todo={todos[todayDayName]}
                />
              ) : null;
            })
          : null}
      </StyledWrapper>
    );
  }
}

TodoTemplate.propTypes = {
  getTodos: propTypes.func.isRequired,
  getDone: propTypes.func.isRequired,
  todoDone: propTypes.objectOf(propTypes.object),
  todos: propTypes.objectOf(propTypes.object),
};

TodoTemplate.defaultProps = {
  todoDone: {},
  todos: {},
};

const myActionToProps = {
  getTodos: getTodosToday,
  getDone: getDoneTodos,
};

const mapDataOfTodo = state => ({
  todos: state.todosToday,
  todoDone: state.todoDone,
});

export default connect(
  mapDataOfTodo,
  myActionToProps,
)(TodoTemplate);