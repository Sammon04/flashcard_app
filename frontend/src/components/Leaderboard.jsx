
function Leaderboard({userScores}) {

    return (
        <>
        <h3>Leaderboard</h3>
            <table>
                <thead>
                    <tr><th>Name</th><th>Score</th></tr>
                </thead>
                <tbody>
                    {userScores.map((user) => (
                            
                            <tr key={user[0]} className={user[3] ? "youRow" : ""}>
                                <td>{user[1]}</td><td>{user[2]}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    )
}

export default Leaderboard