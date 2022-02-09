import './Footer.css';

const Footer = () => {

    const goToLinkedIn_Cameron = e => {
        e.preventDefault();
        window.open('https://www.linkedin.com/in/camer0n/');
    }

    const goToGithub_Cameron = e => {
        e.preventDefault();
        window.open('https://github.com/cra88y');
    }
    const goToLinkedIn_Dylan = e => {
        e.preventDefault();
        window.open('https://www.linkedin.com/in/roger-s-59133b107/');
    }

    const goToGithub_Dylan = e => {
        e.preventDefault();
        window.open('https://github.com/rogdylan98');
    }
    const goToLinkedIn_Haozhen = e => {
        e.preventDefault();
        window.open('https://www.linkedin.com/in/haozhen-shu-a5136ab7/');
    }

    const goToGithub_Haozhen = e => {
        e.preventDefault();
        window.open('https://github.com/Haozhen-Shu');
    }
    const goToLinkedIn_Mei = e => {
        e.preventDefault();
        window.open('https://www.linkedin.com/in/meiyinshih/');
    }

    const goToGithub_Mei = e => {
        e.preventDefault();
        window.open('https://github.com/MeiMeiYS');
    }

    return (
        <footer>
            <div>
                <div>
                    <p>Cameron Abbott</p>
                    <button
                        type='button'
                        onClick={goToLinkedIn_Cameron}>
                        <i className="fab fa-linkedin-in"></i>
                    </button>
                    <button
                        type='button'
                        onClick={goToGithub_Cameron}>
                        <i className="fab fa-github"></i>
                    </button>
                </div>
                <div>
                    <p>Dylan Silva</p>
                    <button
                        type='button'
                        onClick={goToLinkedIn_Dylan}>
                        <i className="fab fa-linkedin-in"></i>
                    </button>
                    <button
                        type='button'
                        onClick={goToGithub_Dylan}>
                        <i className="fab fa-github"></i>
                    </button>
                </div>
                <div>
                    <p>Haozhen Shu</p>
                    <button
                        type='button'
                        onClick={goToLinkedIn_Haozhen}>
                        <i className="fab fa-linkedin-in"></i>
                    </button>
                    <button
                        type='button'
                        onClick={goToGithub_Haozhen}>
                        <i className="fab fa-github"></i>
                    </button>
                </div>
                <div>
                    <p>Mei Shih</p>
                    <button
                        type='button'
                        onClick={goToLinkedIn_Mei}>
                        <i className="fab fa-linkedin-in"></i>
                    </button>
                    <button
                        type='button'
                        onClick={goToGithub_Mei}>
                        <i className="fab fa-github"></i>
                    </button>
                </div>
            </div>
            <p>© 2022 | Built with React Express PostgreSQL</p>
        </footer>
    )
}


export default Footer;
