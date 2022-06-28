import {mainUrl} from '../../../config/apiUrl';
import axios from 'axios';
// balansni 0 qilish ✅

class directorUController {
  static ReportBalance = (
    note,
    balance,
    dataReport,
    setBalance,
    setQoldiq,
    setModalReportVisible,
  ) => {
    if (note && !(Number(balance) == 0)) {
      axios({
        url: `${mainUrl}lastoria/clear-balance/`,
        method: 'POST',
        data: dataReport,
      })
        .then(res => {
          alert('Bajarildi!');
          setBalance(0);
          setQoldiq(0);
          setModalReportVisible(false);
        })
        .catch(err => {
          alert('Server bilan hatolik yuz berdi');
        });
    } else {
      alert("Balansda mablag' yo'q");
    }
  };
}

export default directorUController;
