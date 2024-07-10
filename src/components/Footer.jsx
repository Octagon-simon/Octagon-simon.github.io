import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <p className='has-text-centered mb-3'>Your favourite Software Developer ✨</p>
                <div className={styles.footerSocial}>
                    <a href="https://github.com/Octagon-simon">
                        <Image src={'./github.svg'} alt='Check out my Github Profile' width={25} height={25} />
                    </a>
                    <a href="https://www.linkedin.com/in/simon-ugorji-57a6a41a3/">
                        <Image src={'./linkedin.svg'} alt='Connect with me on LinkedIn' width={25} height={25} />
                    </a>
                </div>
            </div>
        </footer>
    )
}