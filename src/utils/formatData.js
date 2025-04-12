
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
dayjs.extend(relativeTime);
dayjs.locale('vi');
export const formatTimeAgo = (dateString) => {
  return dayjs(dateString).fromNow();
};


export const formatToVND = (salary) => {
  if (!salary) return 'Liên hệ'; 
  return salary.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
  });
};


export const levelColors = {
  INTERN: 'green',
  FRESHER: 'yellow',
  JUNIOR: 'blue',
  MIDDLE: 'purple',
  SENIOR: 'red',
};