import logo from '../assets/quiz-logo.png'

export default function Header() {
    return (
        <header>
            <img src={logo} alt="React Quiz Image" />
            <h1>REACTQUIZ</h1>
        </header>
    )
}