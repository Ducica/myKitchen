import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import {
    BrowserRouter,

} from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <ScrollToTop/>
         <App/>
    </BrowserRouter>
);

