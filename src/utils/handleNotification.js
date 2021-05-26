import navigation from '../utils/navigation';
import navigator, {cleanerNavigator} from '../navigation/navigator';

// export const handleRouting = (_notification) => {
//   if (_notification && _notification.data && _notification.data.notificationType) {
//     const routeData = _notification.data.notificationType;
//     console.log('route', _notification.data, routeData);
//     switch (routeData) {
//       case 'SUBSCRIPTION':
//         navigation({path: navigator.packageDetail, params:{isCarAdded:''}});
//         break;
//       case 'WORK_HISTORY':
//         navigation({path: cleanerNavigator.workHistory});
//         break;
//       default:
//         navigation({path: navigator.dashBoard});
//         break;
//     }
//   }
// };
