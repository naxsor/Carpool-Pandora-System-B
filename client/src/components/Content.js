import "../stylesheets/style.css"

const Content = ({ children }) => {
    return (
        <>

                <div className="Media Content flex-grow-1">
                    {children}
                </div>
        </>
    );
}

export default Content