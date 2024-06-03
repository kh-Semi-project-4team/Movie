import useTmdbDataPull from '../useTmdbDataPull';
import styles from './css/ComingSoonMovie.module.css'

export default function ComingSoonMovie() {
    
    const { movies } = useTmdbDataPull();



    return (
        <div className={styles.mainposter}>
            <header className={styles.section_title}>Comingsoon Movie!</header>
            <div className={styles.flex_container}>
                <div className={styles.img_box}>
                    <img src='https://image.tmdb.org/t/p/original/fqv8v6AycXKsivp1T5yKtLbGXce.jpg' className={styles.img} />
                </div>  
                <div className={styles.text_box}>
                    <div className={styles.text_container}>
                        <h3 className={styles.sub_title}> title </h3>
                        <p className={styles.release_date}> release_date </p>
                        <p className={styles.sub_content}> contents </p>
                        <button className={styles.Read_More_btn}>Read More</button>
                    </div>
                </div>
                <div className={styles.text_box}>
                    <div className={styles.text_container}>
                        <h3 className={styles.sub_title}> title </h3>
                        <p className={styles.release_date}> release_date </p>
                        <p className={styles.sub_content}> contents </p>
                        <button className={styles.Read_More_btn}>Read More</button>
                    </div>
                </div>
                <div className={styles.img_box}>
                    <img src='https://image.tmdb.org/t/p/original/fqv8v6AycXKsivp1T5yKtLbGXce.jpg' className={styles.img} />
                </div>
            </div>
        </div>
    )
}