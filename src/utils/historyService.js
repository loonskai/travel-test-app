const parseDate = date =>
  date
    .toDateString()
    .slice(4)
    .split(' ')
    .map((el, i) => (i === 1 ? `${el},` : el))
    .join(' ');

export const parseRecord = record => {
  const keys = Object.keys(record);
  const result = [];
  const startDate = record['start-date']
    ? parseDate(new Date(record['start-date']))
    : parseDate(new Date());
  const endDate = record['end-date']
    ? parseDate(new Date(record['end-date']))
    : 'Any Date';
  result.push(`${startDate} - ${endDate}`);
  keys.forEach(key => {
    switch (key) {
      case 'start-date':
      case 'end-date':
        break;
      default:
        result.push(record[key]);
    }
  });
  return result.join(', ');
};

export const createItem = ({ text, icon, closingButton }) => {
  const item = document.createElement('div');
  console.log(text);
  item.classList =
    'list-group-item d-flex justify-content-between align-items-center';
  const itemText = document.createElement('span');
  if (icon) {
    const bedIcon = document.createElement('i');
    bedIcon.className = 'fas fa-bed';
    itemText.appendChild(bedIcon);
  }
  if (text) {
    const textNode = document.createTextNode(` ${text}`);
    itemText.appendChild(textNode);
  }
  item.appendChild(itemText);
  if (closingButton) {
    const button = document.createElement('i');
    button.className = 'fas fa-times-circle list__item-close';
    item.appendChild(button);
  }
  return item;
};
