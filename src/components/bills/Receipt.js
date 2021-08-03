import Header from "../header/Header"
import InnerNav from "../innernav/InnerNav"
import ReceiptSearch from "../searchbar/ReceiptSearch"
import Results from "./Results"

function Receipt() {
    return (
        <div> 
            <Header/>
            <InnerNav />
            <ReceiptSearch />
            <Results/>
        </div>
    )
}

export default Receipt