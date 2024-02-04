import Header from "./components/header/Header";
import "./App.scss";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import New_arrievel from "./components/new_arrievel/New_arrievel";
import Bed_room from "./components/bed_room/Bed_room";
import Pillows from "./components/pillows/Pillows";
import Living_room from "./components/living_room/Living_room";
import Chair from "./components/chair/Chair";
import Contact from "./components/contact_page/Contact";
import Product_detail from "./components/productDetail/Product_detail";
// import { useSelector } from "react-redux";
import Cart from "./components/cart/Cart.jsx";
import Login from "./components/login/Login.jsx";
import Admin from "./Admin.jsx";
import Bed from "./components/footerRoutes/Bed.jsx";
import L_Safe from "./components/footerRoutes/L-Safe.jsx";  //
import U_Safe from "./components/footerRoutes/U-Safe.jsx";
import Mattress from "./components/footerRoutes/Mattress.jsx";
import Sectional_Sofa from "./components/footerRoutes/Sectional_Sofa.jsx";
import _3_1_1 from "./components/footerRoutes/_3_1_1.jsx";
import Stationary_Sofa from "./components/footerRoutes/Stationary_Sofa.jsx";
import Round_Chair from "./components/footerRoutes/Round_Chair.jsx";
import High_Back_Chair from "./components/footerRoutes/High_Back_Chair.jsx";
import Dining_Chair from "./components/footerRoutes/Dining_Chair.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/new-arrivel" element={<New_arrievel />} />
        <Route exact path="/bed-room" element={<Bed_room />} />
        <Route exact path="/pillows" element={<Pillows />} />
        <Route exact path="/living-room" element={<Living_room />} />
        <Route exact path="/chair" element={<Chair />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/product-detail/:id" element={<Product_detail />} />
        <Route exact path="/admindashboard" element={<Admin />} />
        <Route exact path="/bed-room/bed" element={<Bed />} />
        <Route exact path="/living-room/l-shape" element={<L_Safe />} />
        <Route exact path="/living-room/u-shape" element={<U_Safe />} />
        <Route exact path="/bed-room/mattress" element={<Mattress />} />
        <Route exact path="/living-room/sectional-sofa" element={<Sectional_Sofa />} />
        <Route exact path="/living-room/3+1+1" element={<_3_1_1 />} />
        <Route exact path="/living-room/stationary-sofa" element={<Stationary_Sofa/>} />
        <Route exact path="/chairs/round-chair" element={<Round_Chair/>} />
        <Route exact path="/chairs/high-back-chair" element={<High_Back_Chair/>} />
        <Route exact path="/chairs/dining-chair" element={<Dining_Chair/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
