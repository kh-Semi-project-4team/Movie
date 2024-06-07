import React from 'react';
import Footer from "./../publicpage/footer/Footer";
import NavBar from "./../publicpage/navbar/NavBar";
import BestMovie from "./contents/BestMovie";
import ComingSoonMovie from "./contents/ComingSoonMovie";
import KategorieMovie from "./contents/KategorieMovie";
import SliderComponent from "./header/SliderComponent";

export default function MainPage() {
  const mainPageSections = [
    { id: 'home-section', name: '메인' },
    { id: 'Best-section', name: '인기영화' },
    { id: 'ComingSoon-section', name: '개봉예정영화' },
    { id: 'Kategorie-section', name: '장르별영화' },
  ];

  return (
    <div>
      <NavBar title="Main Page" sections={mainPageSections} />
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
        <KategorieMovie/> 
      </section>
      <div style={{ height: "100px" }} />
      <Footer />
    </div>
  );
}
