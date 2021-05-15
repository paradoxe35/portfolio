import { forwardRef } from 'react'
import style from 'styles/layout.module.scss'

type GridProps = {
    col?: number;
    ref?: React.MutableRefObject<HTMLDivElement | null>;
}


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

//@ts-ignore
export const Grid: React.FC<GridProps> = forwardRef<HTMLDivElement, GridProps>(({ children, col }, ref) => {
    return <div ref={ref} className={`${style.grid} ${col ? style['grid__' + col] : ''}`}>{children}</div>
})

export const Card: React.FC = ({ children, ...props }) => {
    return <div className={style.card} {...props}>{children}</div>
}