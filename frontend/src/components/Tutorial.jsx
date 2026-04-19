

function Tutorial() {
    return (
        <section className="tutorial">
            <h3>How To Play:</h3>
            <p>
                You may choose either to either play the full quiz (every user), or a short quiz (5 users) using the buttons above.
                When you are redirected to the quiz page, you will be presented with the image of a colleague. You are to answer
                the following questions for each colleague:
            </p>
            <ul>
                <li>What is this person's name?</li>
                <li>What is this person's role</li>
                <li>What is this person's department?</li>
                <li>What is this person's location within the company?</li>
                <li>Which of these interesting facts is about this person?</li>
            </ul>
            <p>
                Once you've selected your answers for the presented colleague and clicked "Check Answers", you will
                be able to see the questions you got right/wrong. Once you are done looking over them, click
                "Next Person" to continue. You have the option to skip, but you would be missing out on potential
                points. You get 1 point for every correct question. You will not be penalized for answering wrong.
            </p>
            <p>
                Once the selected quiz is over, your final score will be tallied. If your final score is better
                than your personal best (which you can view on the leaderboard), then your personal best will update
                to reflect your new personal best. If your final score is not better than your personal best,
                you'll just have to try again.
            </p>
        </section>
    )
}

export default Tutorial