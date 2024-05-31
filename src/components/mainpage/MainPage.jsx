import BestMovie from "./contents/BestMovie";
import SliderComponent from "./header/SliderComponent";


export default function MainPage() {
    return (
        <div>
            <SliderComponent />
            <div style={{ height: "100px" }} />
            <BestMovie />
        </div>
    );
}