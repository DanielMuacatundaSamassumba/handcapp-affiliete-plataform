 export function getISOWeekNumber(date:string | Date) {
    const test = new Date(date)
    const currentDate = new Date(Date.UTC(test.getFullYear(), test.getMonth(), test.getDate()));
    const dayOfWeek = currentDate.getUTCDay() || 7;
    currentDate.setUTCDate(currentDate.getUTCDate() + 4 - dayOfWeek);
    const yearStart = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 1));
    const weekNumber = Math.ceil((((Number(currentDate) - Number(yearStart)) / (24 * 60 * 60 * 1000)) + 1) / 7);
    return weekNumber;
  }