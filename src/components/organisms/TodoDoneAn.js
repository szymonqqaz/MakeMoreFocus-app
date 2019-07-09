import React from 'react';
import Date from 'components/atoms/Date/Date';
import TodoDidNotDone from 'components/molecules/TodoDidNotDone/TodoDidNotDone';
import TodoDoneDone from 'components/molecules/TodoDoneDone/TodoDoneDone';

const TodoDoneAn = ({ date, todoToday, todayDone }) => {
  let przep = true;
  const tab = [];

  if (todoToday.length !== 0) {
    todoToday.forEach((e, i) => {
      przep = true;
      if (todayDone.length === 0) {
        tab[i] = e;
      }
      if (e !== null) {
        todayDone.forEach(element => {
          if (element !== null) {
            przep = false;
            if (element.idTodo === e.id) {
              tab[i] = element;
            } else {
              tab[i] = e;
            }
          } else if (przep) {
            tab[i] = e;
          }
        });
      }
    });
  }

  const transformDate = date => {
    const NameOfDaysPL = ['nidz', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob'];

    const NameOfMonthsPL = [
      'sty',
      'lut',
      'mar',
      'kwi',
      'maj',
      'cze',
      'lip',
      'sie',
      'wrz',
      'paz',
      'lis',
      'gru',
    ];

    const month = date.month[0] === '0' ? parseInt(date.month[1]) : parseInt(date.month);

    return `${NameOfDaysPL[date.dayNumber]} ${date.day} ${NameOfMonthsPL[month + 1]}`;
  };

  return (
    <div>
      <Date big>{transformDate(date)}</Date>
      {tab.map(e => (
        <>
          {e !== null && (
            <>
              {e.date === undefined ? (
                <>
                  <TodoDidNotDone data={e} />
                </>
              ) : (
                <>
                  {e.state === 1 ? (
                    <TodoDoneDone data={e}>zrobione</TodoDoneDone>
                  ) : (
                    <TodoDidNotDone data={e} />
                  )}
                </>
              )}
            </>
          )}
        </>
      ))}
    </div>
  );
};

export default TodoDoneAn;
