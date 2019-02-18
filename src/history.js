import '@babel/polyfill';
import * as historyService from './utils/historyService';

import './styles/main.scss';

window.onload = () => {
  const listContainer = document.getElementById('history-list');
  const history = JSON.parse(localStorage.getItem('history')) || {};
  const keys = Object.keys(history);

  if (keys.length > 0) {
    keys.forEach(key => {
      const historyRecord = history[key];
      const text = historyService.parseRecord(historyRecord);
      const item = historyService.createItem({
        text,
        icon: true,
        closingButton: true
      });
      item.id = key;
      listContainer.appendChild(item);
    });
  } else {
    const item = historyService.createItem({ text: 'No Previous Searches' });
    listContainer.appendChild(item);
  }
};
