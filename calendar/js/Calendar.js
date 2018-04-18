class CalendarCore {

  constructor(date) {
    this.date = date;
  }

  get currentYear() {
    return this.date.getFullYear();
  }

  get currentDate() {
    return this.date.getDate();
  }

  get currentMonth() {
    return this.date.getMonth();
  }

  get currentDay() {
    return this.date.getDay();
  }

  monthDaysCount(monthCursor = 0) {
    return 33 - new Date(this.currentYear, this.currentMonth + monthCursor, 33).getDate();
  }

  get firstDateWeekDayOfCurrentMonth() {
    return new Date(this.currentYear, this.currentMonth, 1).getDay();
  }

}
const calendarCore = new CalendarCore(new Date());

const makeCalendarMatrix = (calendarCore) => {
  const calendarMatrix = [];
  const matrixRow = [...new Array(7)];

  const currentDay = calendarCore.currentDay();
  // const

  for (let i = 0; i < 7; i++) {

  }

  return calendarMatrix;
};

const Calendar = (props) => {
  const { date } = props;
  const calendarCore = new CalendarCore(date);

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">Среда</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">8</div>
          <div className="ui-datepicker-material-month">Марта</div>
          <div className="ui-datepicker-material-year">2017</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">Март</span>&nbsp;<span className="ui-datepicker-year">2017</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col/>
          <col/>
          <col/>
          <col/>
          <col/>
          <col className="ui-datepicker-week-end"/>
          <col className="ui-datepicker-week-end"/>
        </colgroup>
        <thead>
        <tr>
          <th scope="col" title="Понедельник">Пн</th>
          <th scope="col" title="Вторник">Вт</th>
          <th scope="col" title="Среда">Ср</th>
          <th scope="col" title="Четверг">Чт</th>
          <th scope="col" title="Пятница">Пт</th>
          <th scope="col" title="Суббота">Сб</th>
          <th scope="col" title="Воскресенье">Вс</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td className="ui-datepicker-other-month">27</td>
          <td className="ui-datepicker-other-month">28</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
        </tr>
        <tr>
          <td>6</td>
          <td>7</td>
          <td className="ui-datepicker-today">8</td>
          <td>9</td>
          <td>10</td>
          <td>11</td>
          <td>12</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};