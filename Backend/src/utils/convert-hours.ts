export const convertHoursStringToMinutes = (hoursString: string) => {
  const [hours, minutes] = hoursString.split(':').map(Number);

  return  (hours * 60) + minutes;
}

export const convertMinutesToHoursString = (minutesAmount: number) => {
  const hours = Math.floor(minutesAmount / 60);
  const minutes = minutesAmount % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};