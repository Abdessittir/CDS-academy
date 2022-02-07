import "../../styles/home/AboutInfo.css";

function AboutInfo({Icon, title, description}) {
    return (
        <div className='about_info'>
            <div data-aos='flip-left' className='about_infoIcon'>
                <Icon className='about__icon' />
            </div>
            <div data-aos='fade-in'>{title}</div>
            <p data-aos='fade-in'>{description}</p>
        </div>
    );
}

export default AboutInfo;