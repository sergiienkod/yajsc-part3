export function getExpirationDatePlusMonths(months: number): string {
  const today = new Date();
  
  const expMonth = today.getMonth() + 1 + months;
  const expYear = today.getFullYear() + Math.floor((expMonth - 1) / 12);
  const month = ((expMonth - 1) % 12) + 1;
  const monthStr = month.toString().padStart(2, '0');

  return `${monthStr}/${expYear}`;
}