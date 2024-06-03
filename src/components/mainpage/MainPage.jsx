import Footer from "./../login/footer/Footer";
import NavBar from "./../login/navbar/NavBar";
import BestMovie from "./contents/BestMovie";
import ComingSoonMovie from "./contents/ComingSoonMovie";
import SliderComponent from "./header/SliderComponent";

export default function MainPage() {
    return (
        <div>
            <NavBar/>
            <section id="home-section">
                <SliderComponent />
            </section>
            <div style={{ height: "100px" }} id="best-movie"/>
            <section id="Best-section">
                <BestMovie />
            </section>
            <div style={{ height: "100px" }} />
            <section id="ComingSoon-section">
                <ComingSoonMovie />            
            </section>
            <div style={{ height: "100px" }} />
            <section id="Kategorie-section">
                {/* Kategorie 컴포넌트 */} 
            </section>
            <Footer />
        </div>
    );
}
