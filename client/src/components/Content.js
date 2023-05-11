import "../stylesheets/style.css"

const Content = ({ children }) => {
    return (
        <>

            <main>
                <div className="Media Content">
                    {children}
                </div>
            </main>
        </>
    );
}

export default Content