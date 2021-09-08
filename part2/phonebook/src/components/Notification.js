const Notification = ({message, opClass}) => {

    if (message === null){
        return null
    }

    return(
        <div className={opClass}>
            {message}
        </div>
    )
}

export default Notification