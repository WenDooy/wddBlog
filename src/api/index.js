// 初始化 leancloud-storage
import AV from "leancloud-storage";

const APP_ID = 'r0mOIKlNdgXVrIxIVbGBSSy0-MdYXbMMI'
const APP_KEY = 'KcPmXN4oTKWF8TJN68kYVdzj'
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
export default {api: AV}
