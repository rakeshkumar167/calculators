export const formatIndianCurrency = (amount: number): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
};

export const formatIndianNumber = (num: number): string => {
  const formatter = new Intl.NumberFormat('en-IN');
  return formatter.format(num);
};