import styles from './footer.module.scss';

export default function Footer(): React.JSX.Element {
    const currentYear = new Date().getFullYear();

    return (
        <div className={ styles.wrapper }>
            <span className={ styles.text }>© { currentYear } Project Catalyst</span>
        </div>
    );
}
