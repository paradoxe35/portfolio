import ProjectModel from 'models/project'
import style from 'styles/modules/home.module.scss'


interface Work {
    aosDuration: number;
    project?: ProjectModel;
}

export default function WorksItem({ aosDuration = 0 }: Work) {
    return <div className={style.project} data-aos="fade-right" data-aos-duration={aosDuration} >
        <a className={style.project__image} href="/projets/kls">
            <img src="https://jonathan-boyer.fr/images/projects/kls/thumbnail.jpg" alt="Aperçu du site Jeremy.design" />
        </a>
        <div className={style.project__body}>
            <div className={style.project__tags}>React</div>
            <a className={style.project__name} href="/projets/kls">KLS Syndication</a>
            <p className={style.project__desc}>Développement React au sein d'une équipe pour le lancement du projet KLS Syndication</p>
            <a className={style.project__action} href="/projets/kls">
                Find out more
                <svg className={style.icon__action} xmlns="http://www.w3.org/2000/svg" fill="none" id="arrow" viewBox="0 0 14 14">
                    <path d="M6 1l.6-.6c.3-.3.8-.3 1.1 0l6 6c.4.4.4.8 0 1.1l-6 6.1c-.3.3-.8.3-1 0l-.7-.7a.8.8 0 010-1l3.7-3.6h-9a.7.7 0 01-.7-.8v-1c0-.4.3-.7.8-.7h9L6 2.2A.7.7 0 016 1z" fill="currentColor"></path>
                </svg>
            </a>
        </div>
    </div>
}