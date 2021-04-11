import style from 'styles/layout.module.scss'

export const Container: React.FC = ({ children }) => {
    return <div className={style.container}>{children}</div>
}

export const Main: React.FC = ({ children }) => {
    return <main className={style.main}>
        <Container>
            {children}
        </Container>
    </main>
}

export const Footer: React.FC = ({ children }) => {
    return <div className={style.footer}>{children}</div>
}

export const Description: React.FC = ({ children }) => {
    return <div className={style.description}>{children}</div>
}

export const Grid: React.FC = ({ children }) => {
    return <div className={style.grid}>{children}</div>
}

export const Card: React.FC = ({ children, ...props }) => {
    return <div className={style.card} {...props}>{children}</div>
}