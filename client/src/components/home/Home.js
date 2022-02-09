import { Fragment, useState } from "react";
import Canvas from "./Canvas";
import LangSelector from "./LangSelector";
import Logo from "./Logo";
import Humberger from "./Humberger";
import Title from "./Title";
import About from "./About";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Buttons from "./Buttons";
import Footer from "./Footer";
import MetaData from "../../MetaData";
import Sidebar from "./Sidebar";

function Home(){
    const [sideBarOpen, setSideBarOpen] = useState(false);

    useEffect(() =>{
        Aos.init({duration: 1000});
    }, []);

    return (
        <Fragment>
            <MetaData title="Home | CDS academy" />
            <Canvas />
            <Logo />
            <LangSelector />
            <Humberger
                callback={() =>setSideBarOpen(prev => !prev)}
                open={sideBarOpen}
            />
            <Sidebar 
                open={sideBarOpen}
            />
            <Title />
            <Buttons />
            <About />
            <Footer />
        </Fragment>
    );
}

export default Home;