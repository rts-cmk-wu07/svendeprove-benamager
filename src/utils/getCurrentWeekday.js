export default function getCurrentWeekday() {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();

  const weekdays = [
    "mandag",
    "tirsdag",
    "onsdag",
    "torsdag",
    "fredag",
    "lørdag",
    "søndag",
  ];

  return weekdays[dayOfWeek - 1];
}
