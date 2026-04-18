
function Leaderboard({userScores}) {
    console.log(userScores)

    var k = 0

    return (
        <>
            <table>
                <thead>
                    <tr><th>name</th><th>score</th></tr>
                </thead>
                <tbody>
                    {userScores.map((user) => (
                            <tr key={k++}><td>{user[0]}</td><td>{user[1]}</td></tr>
                        ))}
                </tbody>
            </table>
        </>
    )
}

export default Leaderboard