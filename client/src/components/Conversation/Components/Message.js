
function Message({ message, type, reference }) {
    const date = new Date(message.time);
    return (
        <div ref={ reference } className={ `message ${ type }` }>
            { message.content }
            <span className='time'> { date.getHours() }:{ date.getMinutes() } </span>
        </div>
    )
}
export default Message