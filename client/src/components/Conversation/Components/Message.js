
function Message({ message, type, reference }) {
    return (
        <div ref={ reference } className={ `message ${ type }` }>
            { message.content }
        </div>
    )
}
export default Message