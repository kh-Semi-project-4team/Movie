import Footer from "./../login/footer/Footer";
import NavBar from "./../login/navbar/NavBar";
import BestMovie from "./contents/BestMovie";
import ComingSoonMovie from "./contents/ComingSoonMovie";
import SliderComponent from "./header/SliderComponent";


export default function MainPage() {
    return (
        <div>
            <NavBar/>
            <SliderComponent />
            <div style={{ height: "100px" }} />
            <BestMovie />
            <div style={{ height: "100px" }} />
            <ComingSoonMovie />            
            <div style={{ height: "100px" }} />
            <Footer />
        </div>
    );
}