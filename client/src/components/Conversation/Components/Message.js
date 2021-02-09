
function Message({ message, type }) {
    return (
        <div className={`message ${type}`}>
            { message.content }
        </div>
    )
}

export default Message
