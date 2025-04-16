import champsLogo from '../assets/quiz-complete.png';

export default function Result() {
    <>
        <img src={champsLogo} alt="Champions Image" />
        <h2>QUIZ COMPLETED!</h2>
        <div>
            <div>
                <div className='number'></div>
                <div className='text'>Skipped</div>
            </div>
            <div>
                <div className='number'></div>
                <div className='text'>Answered correctly</div>
            </div>
            <div>
                <div className='number'></div>
                <div className='text'>Answered Incorrectly</div>
            </div>
        </div>
        <ol>
            <li></li>
        </ol>
    </>
}