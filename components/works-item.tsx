import style from 'styles/modules/home.module.scss'


export default function WorksItem({ aosDuration = 0 }) {
    return <div className={style.project} data-aos-duration={aosDuration} >
        <a className={style.project__image} href="/projets/kls">
            <img src="https://jonathan-boyer.fr/images/projects/kls/thumbnail.jpg" alt="Aperçu du site Jeremy.design" />
        </a>
        <div className={style.project__body}>
            <div className={style.project__tags}>React</div>
            <a className={style.project__name} href="/projets/kls">KLS Syndication</a>
            <p className={style.project__desc}>Développement React au sein d'une équipe pour le lancement du projet KLS Syndication</p>
            <a className={style.project__action} href="/projets/kls">
                En savoir plus
            </a>
        </div>
    </div>
}