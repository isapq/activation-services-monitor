import './Footer.css';

export const Footer = () => {
    return (
        <footer className='footer'>
            <div className='divLogo'>
                <img src="src\images\formigaEnosLogo3.png" alt="" />
                <h3>Sistema Formiga <strong>ENOS</strong></h3>
            </div>

            <div className='lineBlack'></div>

            <h3 className='devBy'>Desenvolvido por <strong>Isaque Pereira dos Santos</strong></h3>
        </footer>
    )
}