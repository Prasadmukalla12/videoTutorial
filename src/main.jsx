import { createRoot } from 'react-dom/client'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import { CookiesProvider } from 'react-cookie'
import store from './store/store.jsx';
import { Provider } from 'react-redux';
import { VideoTutorialIndex } from './video-tutorial/videotutorialindex.jsx'



createRoot(document.getElementById('root')).render(
  
<CookiesProvider>
    <Provider store={store}>
        <VideoTutorialIndex />
    </Provider>
</CookiesProvider>

)
  
