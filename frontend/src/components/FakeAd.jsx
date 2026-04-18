const ADD_NUMBER = 7

function FakeAd() {

    const selected = Math.floor(Math.random() * 7) + 1
    const selectedString = "http://localhost/flashcard_app/backend/uploads/fake ads/" + selected + ".jpg"

    return (
        <>
            <h3>Fake Ad</h3>
            <img className="fakeAd" src={selectedString}/>
        </>
    )
}

export default FakeAd