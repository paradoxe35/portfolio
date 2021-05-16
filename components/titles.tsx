import style from 'styles/modules/home.module.scss'

type Title = {
    title: string;
    subtitle: string;
}

const Titles: React.FC<Title> = function ({ title, subtitle }) {
    return <>
        <div data-aos="fade-up" className={style['section__top-title']}>{title}</div>
        <div data-aos="fade-up" className={style['section__title']}>{subtitle}</div>
    </>
}

export default Titles