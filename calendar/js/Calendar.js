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

  get currentDayNumber() {
    return this.date.getDay();
  }

  monthDaysCount(monthCursor = 0) {
    return new Date(this.currentYear, (this.currentMonth + monthCursor + 1), 0).getDate();
  }

  get firstDateWeekDayOfCurrentMonth() {
    return new Date(this.currentYear, this.currentMonth, 1).getDay();
  }

}


const makeCalendarMatrix = (calendarCore) => {
  const calendarMatrix = [];

  const firstDayOfCurrentMonth = calendarCore.firstDateWeekDayOfCurrentMonth;
  const firstDayOfMonthIsMonday = firstDayOfCurrentMonth === 1;
  const monthDaysCount = calendarCore.monthDaysCount();
  const prevMonthDaysCount = calendarCore.monthDaysCount(-1);
  let needDaysFromPrevMonth = 0;


  if (!firstDayOfMonthIsMonday) {
    if (firstDayOfCurrentMonth === 0) {
      needDaysFromPrevMonth = 6;
    } else {
      needDaysFromPrevMonth = calendarCore.firstDateWeekDayOfCurrentMonth - 1;
    }
  }


  const needRows = Math.ceil((monthDaysCount + needDaysFromPrevMonth) / 7);

  for (let i = 0; i < needRows; i++) {
    const week = [];


    for (let dayNum = 1; dayNum < 8; dayNum++) {
      let day;

      // 1 неделя
      if (!i) {
        if (!needDaysFromPrevMonth) {
          day = dayNum;

        } else {
          const difference = prevMonthDaysCount - needDaysFromPrevMonth + dayNum;
          day = difference > prevMonthDaysCount ?  difference - prevMonthDaysCount : difference;
        }

      // Остальные недели
      } else {
        const difference = i * 7 + dayNum - needDaysFromPrevMonth;
        day = difference > monthDaysCount ? difference - monthDaysCount : difference;
      }

      week.push(day);
    }


    calendarMatrix.push(week);
  }

  return calendarMatrix;
};


const convertCalendarMatrixToDOM = (calendarMatrix, calendarCore) => {
  const { currentDate } = calendarCore;
  const calendarDOM = calendarMatrix.map(
    (week, weekIndex) => (
      <tr key={`week-${weekIndex}`}>{week.map(
        (day) => {
          const conditions = [
            weekIndex === 0 && day > 7,
            weekIndex === calendarMatrix.length - 1 && day < 7
          ];
          let className;

          if (conditions.some(cond => cond)) {
            className = 'ui-datepicker-other-month';

          } else if ( day === currentDate) {
            className = 'ui-datepicker-today';
          }

          return <td key={`week-${weekIndex}-day${day}`} className={className}>{day}</td>;
        }
      )}</tr>
    )
  );

  return calendarDOM;

};


const Calendar = (props) => {
  const { date } = props;
  const calendarCore = new CalendarCore(date);
  const {
    currentYear,
    currentMonth,
    currentDate,
    currentDayNumber
  } = calendarCore;


  const nameOfCurrentMonthNominative = monthsNamesNominative[currentMonth];
  const nameOfCurrentMonthGenitive = monthsNamesGenitive[currentMonth];
  const nameOfCurrentDate = daysNames[currentDayNumber];


  const calendarMatrix = makeCalendarMatrix(calendarCore);
  const calendarDom = convertCalendarMatrixToDOM(calendarMatrix, calendarCore);


  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">

        <div className="ui-datepicker-material-day">
          {nameOfCurrentDate}
        </div>

        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{currentDate}</div>
          <div className="ui-datepicker-material-month">
            {nameOfCurrentMonthGenitive}
          </div>
          <div className="ui-datepicker-material-year">{currentYear}</div>
        </div>

      </div>


      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{nameOfCurrentMonthNominative}</span>&nbsp;
          <span className="ui-datepicker-year">{currentYear}</span>
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
          {calendarDom}
        </tbody>

      </table>
    </div>
  );
};