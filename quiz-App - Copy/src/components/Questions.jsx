import Question from './Question.jsx'

export default function Questions({questionsData}) {

    return (
        <div>
            {questionsData.map((item) => (
                <Question key={item.id} {...item}/>
            ))}
        </div>
    )
}