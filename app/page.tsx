import styles from "./page.module.css";
import Crosswords from "./Crosswords/Crosswords";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Crosswords/>
            </main>
            <footer className={styles.footer}></footer>
        </div>
    );
}
