import Footer from "./../login/footer/Footer";
import NavBar from "./../login/navbar/NavBar";
import BestMovie from "./contents/BestMovie";
import SliderComponent from "./header/SliderComponent";


export default function MainPage() {
    return (
        <div>
            <NavBar/>
            <SliderComponent />
            <div style={{ height: "100px" }} />
            <BestMovie />
            <Footer/>
        </div>
    );
}