import e from "cors"

const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  if (color = 'green') {
    return (
      <div className="notification">
        {message}
      </div>
    )
  } else {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
}

export default Notification