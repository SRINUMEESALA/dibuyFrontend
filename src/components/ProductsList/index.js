
import ProductItem from "../ProductItem"
import { v4 as uuidv4 } from "uuid"
import "./index.css"

const ProductsList = (props) => {
    const { productsList } = props

    return (
        <ul className="productCardsCon p-2 d-flex flex-wrap overflow-auto list-unstyled text-secondary">
            {productsList.map(obj => <ProductItem key={uuidv4()} eachProduct={obj} />)}
        </ul>
    )
}

export default ProductsList



// import InfiniteScroll from 'react-infinite-scroll-component';
// import ProductItem from "../ProductItem"
// import { v4 as uuidv4 } from "uuid"
// import "./index.css"
// import { useState } from 'react';
// import Loader from 'react-loader-spinner'
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

// const ProductsList = (props) => {
//     const { productsList } = props
//     const [start, setStart] = useState(0)
//     const [end, setEnd] = useState(12)
//     const [data, setData] = useState(productsList.slice(end))
//     const [hasMore, setHasMore] = useState(false)


//     const getList = () => {
//         if (productsList.length < end) {
//             setHasMore(false)
//         }
//         setData(productsList.slice(0, end + 12))
//         setEnd(end + 12)
//         setStart(start + 12)
//     }

//     const renderLoader = () => (
//         <div className="text-center m-2"><Loader type="TailSpin" color="#00BFFF" height={50} width={50} /></div>
//     )

//     return (

//         <ul className="productCardsCon p-2 " id="parentCon">
//             <InfiniteScroll
//                 dataLength={data.length} //This is important field to render the next data
//                 next={getList}
//                 hasMore={hasMore}
//                 loader={renderLoader()}
//                 endMessage={
//                     <p style={{ textAlign: 'center' }}>
//                         <b>All Done!</b>
//                     </p>
//                 }
//                 scrollableTarget="parentCon"
//                 // scrollThreshold={0.8}
//                 className='d-flex flex-wrap overflow-auto list-unstyled text-secondary'

//             >
//                 {productsList.map(obj => <ProductItem key={uuidv4()} eachProduct={obj} />)}
//             </InfiniteScroll>

//         </ul>
//     )
// }

// export default ProductsList